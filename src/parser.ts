/**
 * Corresponding to Whitaker's Words parse.adb file
 */

import { Formatter } from "./utils/format/formatter";
import { Tricks } from "./utils/tricks";

import WordsDict from "./data/dictLine";
import LatinAddons from "./data/addons";
import Stems from "./data/stemList";
import Uniques from "./data/uniques";
import Inflects from "./data/inflects";

class Parser {
  stems: (
    | { pos: string; form: string; orth: string; n: number[]; wid: number }
    | { pos: string; form: string; orth: string; n: string[]; wid: number }
  )[];
  inflects: {
    ending: string;
    pos: string;
    note: string;
    n: (string | number)[];
    form: string;
  }[];
  uniques: { orth: string; pos: string; senses: string[] }[];
  //TODO: Add type for addons
  addons: any;
  wordsDict: (
    | {
        pos: string;
        n: number[];
        parts: string[];
        senses: string[];
        form: string;
        orth: string;
        id: number;
      }
    | {
        pos: string;
        n: string[];
        parts: string[];
        senses: string[];
        form: string;
        orth: string;
        id: number;
      }
  )[];
  formatter: Formatter;
  tricks: Tricks;

  constructor() {
    this.stems = Stems;
    this.inflects = Inflects;
    this.uniques = Uniques;
    this.addons = LatinAddons;
    this.wordsDict = WordsDict;

    // Sort by length
    this.stems.sort((a: any, b: any) => a.length - b.length);

    // Sort by length of ending
    this.inflects.sort((a: any, b: any) => a.ending.length - b.ending.length);

    // Support classes
    this.formatter = new Formatter();
    this.tricks = new Tricks();
  }

  public parseLine(
    line: any,
    direction: "lte" | "etl",
    formatted: boolean
  ): any {
    // Prase a line of words delimitated by spaces

    let out = [];

    line = this.formatter.sanitize(line);
    let words = line.split(" ");

    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (word.length > 0) {
        out.push(this.parse(word, direction, formatted));
      }
    }

    return out;
  }

  public parse(
    inputString: string,
    direction: "lte" | "etl",
    formatted: boolean
  ): any {
    /**
     * Parse an input string as a Latin word and look it up in the Words dictionary.
     *
     * Return dictionary and grammatical data formatted in a similar manner as original
     * Words program.
     */

    let out: any = [];

    let s = inputString;

    //do lookup based on parse direction
    if (direction === "lte") {
      out = this.latinToEnglish(s);
    } else if (direction === "etl") {
      out = this.englishToLatin(s);
    } else {
      throw new Error("Invalid direction");
    }

    if (formatted) {
      out = this.formatter.formatOutput(out);
    }

    return { word: s, defs: out };
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
        out.push({ w: unique, stems: [] });
        isUnique = true;
        break;
      }
    }

    if (!isUnique) {
      out = this.findForms(word, false);
    }

    // TODO: handle this in findForms, to improve speed
    // Some words that start with i can also start with j
    // not sure if j is possible but it should not affect anything
    // ex: iecit -> jecit
    if (out.length === 0 && word[0].toLowerCase() === "i") {
      word = "j" + word.slice(1);
      out = this.findForms(word, false);
    } else if (out.length === 0 && word[0].toLowerCase() === "j") {
      word = "i" + word.slice(1);
      out = this.findForms(word, false);
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

  private englishToLatin(word: string): any {
    // Find Latin word from English definition
    let out: any = [];

    // Check against list of uniques
    for (const unique of this.uniques) {
      for (const sense of unique.senses) {
        if (sense.toLowerCase().includes(word.toLowerCase())) {
          out.push({ w: unique, stems: [] });
          break;
        }
      }
    }

    // If it's not in the list of uniques
    if (out.length === 0) {
      out = this.lookupWord(word);
    }

    return out;
  }

  private lookupWord(word: string): any {
    let out: any = [];

    for (const dictLine of this.wordsDict) {
      for (const sense of dictLine.senses) {
        if (sense.toLowerCase().includes(word.toLowerCase())) {
          out.push({ w: dictLine, stems: [] });
          break;
        }
      }
    }

    //should be placed in stems after formatter can handle these stems
    //this.getStems(dictLine.form, dictLine.pos)

    return out;
  }

  private getStems(form: string, pos: string): any {
    let stems: any = [];

    for (const stem of this.stems) {
      if (stem.pos === pos && stem.form === form) {
        stems.push(stem);
      }
    }

    return stems;
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

    out = this.lookupStems(stems, out);

    //!!! this is broken => germinae and prob others not searching, this the problem
    if (out.length === 0 && !reduced) {
      let rOut: any = this.reduce(s);
      // if there is more data after reducing, extend out
      //!!! here
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
      const w = s.replace(new RegExp(`${infl.ending}$`), "");

      for (const stem of this.stems) {
        if (w === stem.orth) {
          // If the inflection and stem identify as the same part of speech
          if (
            infl.pos === stem.pos ||
            (infl.pos === "VPAR" && stem.pos === "V")
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
        if (stem.st.wid === word.id) {
          let wordIsInOut = false;
          for (let i = 0; i < out.length; i++) {
            const w = out[i];
            if (
              ("id" in w["w"] && word["id"] === w["w"]["id"]) ||
              w["w"]["orth"] === word["orth"]
            ) {
              // It is in the out list already, flag and then check if the stem is already in the stems
              wordIsInOut = true;

              // Ensure the stem is not already in the out word stems
              let wordIsInOutWordStems = false;
              for (const st of out[i]["stems"]) {
                if (st === stem) {
                  wordIsInOutWordStems = true;
                  // We have a match, break the loop
                  break;
                }
              }

              if (!wordIsInOutWordStems) {
                out[i]["stems"].push(stem);
              }
              // If we matched a word in the out, break the loop
              break;
            }
          }
          let tempStem = stem;
          // If the word isn't in the out yet
          if (!wordIsInOut) {
            // Check the VPAR / V relationship
            if (word["pos"] === "V") {
              // If the stem doesn't match the 4th principle part, it's not VPAR
              if (word["parts"].indexOf(stem["st"]["orth"]) === 3) {
                // Remove "V" infls
                tempStem = this.removeExtraInfls(stem, "V");
              } else {
                // Remove "VPAR" infls
                tempStem = this.removeExtraInfls(stem, "VPAR");
              }
            }
            out.push({ w: { ...word }, stems: [tempStem] });
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
          out.push({ w: e, stems: [] });
          s = s.replace(new RegExp(e.orth + "$"), "");
        }
        break;
      }
    }

    if (s.startsWith("qu")) {
      for (const e of this.addons.packons) {
        if (s.endsWith(e.orth)) {
          out.push({ w: e });
          s = s.replace(new RegExp(e.orth + "$"), "");
          break;
        }
      }
    } else {
      for (const e of this.addons.notPackons) {
        if (s.endsWith(e.orth)) {
          out.push({ w: e });
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
}

export { Parser };
