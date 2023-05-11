/**
 * Corresponding to Whitaker's Words parse.adb file
 */

import { Formatter } from "./utils/format/formatter";
import { Tricks } from "./utils/tricks";
import { LatinToEnglish } from "./latinToEnglish";
import { EnglishToLatin } from "./englishToLatin";

import WordsDict from "./data/dictLine";
import LatinAddons from "./data/addons";
import Stems from "./data/stemList";
import Uniques from "./data/uniques";
import Inflects from "./data/inflects";
import English from "./data/english";

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
  english: {
    orth: string;
    wid: number;
    pos: number;
    frequencyType: string;
    frequency: number;
    compound: number;
    semi: number;
  }[];
  formatter: Formatter;
  tricks: Tricks;
  englishToLatin: EnglishToLatin;
  latinToEnglish: LatinToEnglish;

  constructor() {
    this.stems = Stems;
    this.inflects = Inflects;
    this.uniques = Uniques;
    this.addons = LatinAddons;
    this.wordsDict = WordsDict;
    this.english = English;

    // Sort by length
    this.stems.sort((a: any, b: any) => a.length - b.length);

    // Sort by length of ending
    this.inflects.sort((a: any, b: any) => a.ending.length - b.ending.length);

    // Support classes
    this.formatter = new Formatter();
    this.tricks = new Tricks();
    this.englishToLatin = new EnglishToLatin(this.english, this.wordsDict);
    this.latinToEnglish = new LatinToEnglish(this.wordsDict, this.uniques, this.addons, this.stems, this.inflects, this.tricks);
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
      out = this.latinToEnglish.latinToEnglish(s);
    } else if (direction === "etl") {
      out = this.englishToLatin.englishToLatin(s);
    } else {
      throw new Error("Invalid direction");
    }

    if (formatted) {
      out = this.formatter.formatOutput(out);
    }

    return { word: s, defs: out };
  }
}

export { Parser };
