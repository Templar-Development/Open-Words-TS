class LatinToEnglish {
  constructor(
    private wordsDict: any,
    private uniques: any,
    private addons: any,
    private stems: any,
    private inflects: any,
    private tricks: any
  ) {}

  //!!! endings of all words are being cut off
  public latinToEnglish(word: string): any {
    //Find definition and word formation from Latin word

    let isUnique = false;
    let out: any = [];

    // check against list of uniques
    let uniqueOut = this.parseUniques(word);
    out = uniqueOut[0];
    isUnique = uniqueOut[1];

    if (!isUnique) {
      out = this.findForms(word, false);
    }

    // Some words that start with i can also start with j
    // not sure if j is possible but it should not affect anything
    // ex: iecit -> jecit
    if (out.length === 0 && this.tricks.switchFirstIOrJ(word) != word) {
      word = this.tricks.switchFirstIOrJ(word);
      out = this.findForms(word, false);
    }

    // If nothing is found, try removing enclitics and try again
    // ex: clamaverunt -> clamare
    // doing this here instead of earlier should fix words like salve having the "ve" removed and returning wrong def
    if (out.length === 0) {
      let split = this.splitEnclitic(word);
      word = split[0];
      out = split[1];

      uniqueOut = this.parseUniques(word);
      out = uniqueOut[0];
      isUnique = uniqueOut[1];

      if (!isUnique) {
        out = this.findForms(word, false);
      }

      if (out.length === 0 && this.tricks.switchFirstIOrJ(word) != word) {
        word = this.tricks.switchFirstIOrJ(word);
        out = this.findForms(word, false);
      }
    }

    // translate roman numerals
    if (this.tricks.onlyRomanDigits(word)) {
      let num = this.tricks.evaluateRomanNumerals(word);

      if (num != 0) {
        out.push({
          w: {
            orth: word,
            pos: "INT",
            n: [num],
            parts: [],
            senses: [num],
            id: `${-1}`
          },
          stems: []
        });
      }
    }

    return out;
  }

  private parseUniques(word: string): any {
    // Find Latin word from English definition
    let out: any = [];
    let isUnique = false;

    // Check against list of uniques
    for (const unique of this.uniques) {
      if (unique.orth.toLowerCase() === word.toLowerCase()) {
        out.push({ w: unique, stems: [] });
        isUnique = true;
        break;
      }
    }

    return [out, isUnique];
  }

  private findForms(s: string, reduced: boolean): any {
    let infls: any = [];
    let out: any = [];

    // Check against list of inflections
    for (const infl of this.inflects) {
      if (s.endsWith(infl.ending)) {
        // If the longest inflection has been found, stop looking
        if (infls.length > 0 && infls[0].ending.length > infl.ending.length) {
          break;
        } else {
          infls.push(infl);
        }
      }
    }

    // Run against the list of stems
    let stems = this.checkStems(s, infls, true);
    // If no stems were found, try again without ensuring infls
    // allows for words that end with erunt and similar cases
    // ex: clamaverunt return null without this
    if (stems.length === 0) {
      stems = this.checkStems(s, infls, false);
    }

    out = this.lookupStems(stems, out);

    if (out.length === 0 && !reduced) {
      let rOut: any = this.reduce(s);
      // if there is more data after reducing, extend out
      if (rOut) {
        out = out.concat(rOut);
      }
    }

    return out;
  }

  private reduce(s: string): any {
    // Reduce the stem with suffixes and try again

    let out: any = [];
    let foundNewMatch: boolean = false;

    // For each inflection match, check prefixes and suffixes
    for (const prefix of this.addons.prefixes) {
      if (s.startsWith(prefix.orth)) {
        s = s.replace(new RegExp(`^${prefix.orth}`), "");
        out.push({ w: prefix, stems: [], addon: "prefix" });
        break;
      }
    }

    for (const suffix of this.addons.suffixes) {
      if (s.endsWith(suffix.orth)) {
        s = s.replace(new RegExp(`${suffix.orth}$`), "");
        out.push({ w: suffix, stems: [], addon: "suffix" });
        break;
      }
    }

    out = this.findForms(s, true);

    // Has reducing input string given us useful data?
    for (const word of out) {
      if (word["stems"].length > 0) {
        foundNewMatch = true;
      }
    }

    if (!foundNewMatch) {
      out = false;
    }

    return out;
  }

  //TODO: if the stem is the word, also find it, ex: salve | look at whitaker response
  private checkStems(s: string, infls: any, ensureInfls: boolean): any {
    /**
     * For each inflection that was a match, remove the inflection from
     * the end of the word string and then check the resulting stem
     * against the list of stems from stemList.ts
     */

    let matchStems: any = [];

    // For each of the inflections that is a match, strip the inflection from the end of the word
    // Then look up the stripped word (w) in the stems
    for (const infl of infls) {
      const w = s.replace(new RegExp(`${infl.ending}$`), "");

      for (const stem of this.stems) {
        if (w === stem.orth) {
          // If the inflection and stem identify as the same part of speech
          if (
            infl.pos === stem.pos ||
            (infl.pos === "VPAR" && stem.pos === "V")
          ) {
            // Ensure the inflections apply to the correct stem decl/conj/etc
            if (infl.n[0] != stem.n[0] && ensureInfls) {
              continue;
            }
            let isInMatchStems = false;

            // If this stem is already in the matchStems list, add infl to that stem (if not already an infl in that stem list)
            for (let i = 0; i < matchStems.length; i++) {
              const mst = matchStems[i];
              if (stem === mst.st) {
                isInMatchStems = true;

                // So the matches a stem in the matchStems. Is it unique to that stem's infls. If so, append it to that stem's infls.
                let isInStemInfls = false;
                for (const stemInfl of mst.infls) {
                  if (stemInfl.form === infl.form) {
                    isInStemInfls = true;
                    // we found a match, stop looking
                    break;
                  }
                }

                if (!isInStemInfls) {
                  mst.infls.push(infl);
                }
              }
            }

            if (!isInMatchStems) {
              matchStems.push({ st: stem, infls: [infl] });
            }
          }
        }
      }
    }
    return matchStems;
  }

  private lookupStems(matchedStems: any, outList: any): any {
    for (const matchedStem of matchedStems) {
      const dictWord = this.wordsDict.find(
        (word: any) => word.id === matchedStem.st.wid
      );

      if (dictWord) {
        // Check if the word is already in the out list
        const wordIsInOut = outList.some(
          (w: any) =>
            ("id" in w.w && dictWord.id === w.w.id) ||
            w.w.orth === dictWord.orth
        );

        // If the word is already in the out list, add the stem to it
        if (wordIsInOut) {
          const matchingWord = outList.find(
            (w: any) =>
              ("id" in w.w && dictWord.id === w.w.id) ||
              w.w.orth === dictWord.orth
          );
          this.addStemToWord(matchedStem, matchingWord);
        }
        // If the word is not in the out list, add it with the stem
        else {
          let tempStem = matchedStem;
          if (dictWord.pos === "V") {
            const fourthPart = dictWord.parts[3];
            if (fourthPart !== matchedStem.st.orth) {
              tempStem = this.removeExtraInfls(matchedStem, "VPAR");
            } else {
              tempStem = this.removeExtraInfls(matchedStem, "V");
            }
          }
          outList.push({ w: { ...dictWord }, stems: [tempStem] });
        }
      }
    }
    return outList;
  }

  private addStemToWord(stem: string, word: any) {
    let wordIsInOutWordStems = false;
    for (const st of word.stems) {
      if (st === stem) {
        wordIsInOutWordStems = true;
        break;
      }
    }

    if (!wordIsInOutWordStems) {
      word.stems.push(stem);
    }
  }

  private splitEnclitic(word: string): [string, any[]] {
    // Test the different tackons / packons as specified in addons.ts
    let out: any[] = [];
    let tackon: any;

    for (const enclitic of this.addons.tackons) {
      if (word.endsWith(enclitic.orth)) {
        tackon = enclitic;
        break;
      }
    }

    if (tackon) {
      tackon.form = tackon.orth;
      // Est exception
      if (word != "est") {
        out.push({ w: tackon, stems: [] });
      }
      word = word.slice(0, word.length - tackon.orth.length);
    } else {
      let packons = word.startsWith("qu")
        ? this.addons.packons
        : this.addons.notPackons;
      for (const enclitic of packons) {
        if (word.endsWith(enclitic.orth)) {
          out.push({ w: enclitic });
          word = word.slice(0, word.length - enclitic.orth.length);
          break;
        }
      }
    }

    return [word, out];
  }

  private removeExtraInfls(stem: any, removeType: string = "VPAR"): any {
    // create a new array of inflections that don't match the removeType
    const filteredInfls = stem.infls.filter(
      (infl: any) => infl.pos !== removeType
    );

    return { ...stem, infls: filteredInfls };
  }
}

export { LatinToEnglish };
