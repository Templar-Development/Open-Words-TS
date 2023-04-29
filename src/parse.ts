/**
 * Corresponding to Whitaker's Words parse.adb file
 */

import WordsDict from "./data/dictLine";
import LatinAddons from "./data/addons";
import Stems from "./data/stemList";
import Uniques from "./data/uniques";
import Inflects from "./data/inflects";

class Parse {
  constructor(
    private wordsDict = WordsDict,
    private addons = LatinAddons,
    private stems = Stems,
    private uniques = Uniques,
    private inflects = Inflects
  ) {

    // Sort by length
    this.stems.sort((a: any, b: any) => a.length - b.length);

    // Sort by length of ending
    this.inflects.sort((a: any, b: any) => a.ending.length - b.ending.length);
  }

  public parseLine(line: any, direction: "lte" | "etl", formatted: boolean): any {
    // Prase a line of words delimitated by spaces

    let out = [];

    line = this.sanitize(line);
    let words = line.split(' ');

    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (word.length > 0) {
        out.push(this.parse(word, direction, formatted));
      }
    }

    return out;
  }

  public parse(inputString: string, direction: "lte" | "etl", formatted: boolean): any {
    /**
     * Parse an input string as a Latin word and look it up in the Words dictionary.
     * 
     * Return dictionary and grammatical data formatted in a similar manner as original
     * Words program.
     */

    let out: any = [];

    let s = inputString;

    //do lookup based on parse direction
    if (direction === 'lte') {
      out = this.latinToEnglish(s);
    } else {

    }

    if (formatted) {
      //format the output
    }

    return { "word": s, "defs": out }
  }

  private latinToEnglish(word: string): any {
    //Find definition and word formation from Latin word

    let isUnique = false;
    let out: any = [];

    let split = this.splitEnclitic(word);
    word = split[0];
    out = split[1];


    // check against list of uniques
    for (const unique of this.uniques) {
      if (word == unique.orth) {
        out.push({ "w": unique, "stems": [] });
        isUnique = true;
        break;
      }
    }

    // If it's not in the list of uniques
    if (!isUnique) {
      console.log("find forms")
    }

    return out;
  }

  private englishToLatin(word: string): any {
    //Find Latin word from English definition

    let out: any = [];

    return out;
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
    const stems = this.checkStems(s, infls);

    // look up in dictionary
    if (reduced) {
      // Word ends are not looked up in the dictionary, so words are not weird


    } else {

    }



  }

  private checkStems(s: string, infls: any): any {
    /**
     * For each inflection that was a match, remove the inflection from
     * the end of the word string and then check the resulting stem
     * against the list of stems from stemList.ts
     */

    let matchStems: any = [];

    // For each of the inflections that is a match, strip the inflection from the end of the word
    // Then look up the stripped word (w) in the stems
    for (const infl of infls) {
      const w = s.replace(new RegExp(`${infl.ending}$`), '');

      for (const stem of this.stems) {
        if (w === stem.orth) {
          // If the inflection and stem identify as the same part of speech
          if (
            infl.pos === stem.pos ||
            (infl.pos === 'VPAR' && stem.pos === 'V')
          ) {
            // Ensure the inflections apply to the correct stem decl/conj/etc
            if (infl.n[0] === stem.n[0]) {
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
    }

    return matchStems;
  }

  private lookupStems(matchStems: any, out: any): any {
    // Find the word id mentioned in the stem in the dictionary

    for (let i = 0; i < matchStems.length; i++) {
      const stem = matchStems[i];
      for (let i = 0; i < this.wordsDict.length; i++) {
        const word = this.wordsDict[i];
        // Lookup by id
        if (stem['id']['wid'] != word['id']) break;
        let wordIsInOut = false;

        for (let i = 0; i < out.length; i++) {
          const w = out[i];
          if ('id' in w['w'] && word['id'] == w['w']['id'] || w['w']['orth'] == word['orth']) {
            // It is in the out list already, flag and then check if the stem is already in the stems
            wordIsInOut = true;

            // Ensure the stem is not already in the out word stems
            let wordIsInOutWordStems = false;
            for (const st of out[i]['stems']) {
              if (st === stem) {
                wordIsInOutWordStems = true;
                // We have a match, break the loop
                break;
              }
            }

            if (!wordIsInOutWordStems) {
              out[i]['stems'].push(stem);
            }
            // If we matched a word in the out, break the loop
            break;
          }
          let tempStem = stem;
          // If the word isn't in the out yet
          if (!wordIsInOut) {
            // Check the VPAR / V relationship
            if (word['pos'] === 'V') {
              // If the stem doesn't match the 4th principle part, it's not VPAR
              if (word['parts'].indexOf(stem['st']['orth']) === 3) {
                // Remove "V" infls
                tempStem = this.removeExtraInfls(stem, 'V');
              } else {
                // Remove "VPAR" infls
                tempStem = this.removeExtraInfls(stem, 'VPAR');
              }
            }

            out.push({ w: {...word}, stems: [tempStem] });
          }
        }
      }
    }

    return out;
  }

  private splitEnclitic(s: string): any {
    //Split enclitic ending from word

    let out: any = [];

    // Test the different tackons / packons as specified in addons.ts
    for (const e of this.addons.tackons) {
      if (s.endsWith(e.orth)) {

        // Standardize data format
        e.form = e.orth;

        // Est exception
        if (s != "est") {
          out.push({ 'w': e, "stems": [] });
          s = s.replace(new RegExp(e.orth + "$"), "");
        }
        break;
      }
    }

    if (s.startsWith("qu")) {
      for (const e of this.addons.packons) {
        if (s.endsWith(e.orth)) {
          out.push({ 'w': e });
          s = s.replace(new RegExp(e.orth + "$"), "");
          break;
        }
      }
    } else {
      for (const e of this.addons.notPackons) {
        if (s.endsWith(e.orth)) {
          out.push({ 'w': e });
          s = s.replace(new RegExp(e.orth + "$"), "");
          break;
        }
      }
    }

    return [s, out];
  }

  private removeExtraInfls(stem: any, removeType: string = "VPAR"): any {
    // Make a copy of the stem's inflections
    const stemInflsCopy = [...stem.infls];

    // Loop through the copy of inflections and remove any with a matching removeType
    for (const infl of stemInflsCopy) {
      if (infl.pos === removeType) {
        const index = stem.infls.indexOf(infl);
        stem.infls.splice(index, 1);
      }
    }

    return stem;
  }

  private sanitize(string: string): string {
    //sanitize the input string from all punct and numbers, make lowercase

    let s = string.toLowerCase();
    s = s.replace(/[^a-z ]/g, '');
    s = s.replace(/[0-9]/g, '');
    s = s.replace(/\s+/g, ' ');

    return s;
  }
}

export default Parse;
