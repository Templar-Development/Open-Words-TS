/**
 * Corresponding to Whitaker's Words parse.adb file
 */

import { Formatter } from "./utils/formatter";
import { Tricks } from "./utils/tricks";
import { LatinToEnglish } from "./latinToEnglish";
import { EnglishToLatin } from "./englishToLatin";
import { PrinciplePartFinder } from "./utils/principlePartFinder";

import WordsDict from "./data/dictLine";
import LatinAddons from "./data/addons";
import Stems from "./data/stemList";
import Uniques from "./data/uniques";
import Inflects from "./data/inflects";
import English from "./data/english";

import Stem from "./types/Stem";
import Inflection from "./types/Inflection";
import Unique from "./types/Unique";
import LatinDictEntry from "./types/LatinDictEntry";
import EnglishDictEntry from "./types/EnglishDictEntry";

class Parser {
  stems: Stem[];
  inflects: Inflection[];
  uniques: Unique[];
  addons: any;
  wordsDict: LatinDictEntry[];
  english: EnglishDictEntry[];
  formatter: Formatter;
  tricks: Tricks;
  englishToLatin: EnglishToLatin;
  latinToEnglish: LatinToEnglish;
  principlePartFinder: PrinciplePartFinder;

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
    this.tricks = new Tricks();
    this.principlePartFinder = new PrinciplePartFinder();
    this.englishToLatin = new EnglishToLatin(this.english, this.wordsDict);
    this.latinToEnglish = new LatinToEnglish(
      this.wordsDict,
      this.uniques,
      this.addons,
      this.stems,
      this.inflects,
      this.tricks
    );
    this.formatter = new Formatter(this.principlePartFinder);
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
      if (words[i].length > 0) {
        out.push(this.parse(words[i], direction, formatted));
      }
    }

    return out;
  }

  public parse(
    word: string,
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

    //do lookup based on parse direction
    if (direction === "lte") {
      out = this.latinToEnglish.latinToEnglish(word);
    } else if (direction === "etl") {
      out = this.englishToLatin.englishToLatin(word);
    } else {
      throw new Error("Invalid direction");
    }

    if (formatted) {
      out = this.formatter.formatOutput(out);
    }

    return { word: word, defs: out };
  }
}

export { Parser };
