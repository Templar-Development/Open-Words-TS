/**
 * Allows easy access to the data from the files
 */

import WordsDict from "./data/dictLine";
import LatinAddons from "./data/addons";
import Stems from "./data/stemList";
import Uniques from "./data/uniques";
import Inflects from "./data/inflects";
import English from "./data/english";

import GetLatinWords from "./types/GetLatinWords";
import GetEnglishWords from "./types/GetEnglishWords";
import Stem from "./types/Stem";
import Inflection from "./types/Inflection";
import Unique from "./types/Unique";
import LatinDictEntry from "./types/LatinDictEntry";
import EnglishDictEntry from "./types/EnglishDictEntry";

import transPOS from "./utils/format/transPOS";

class UseData {
  stems: Stem[];
  inflects: Inflection[];
  uniques: Unique[];
  addons: any;
  wordsDict: LatinDictEntry[];
  english: EnglishDictEntry[];

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
  }

  public getLatinWords(props: GetLatinWords): string[] {
    let LatinWordsList: string[] = [];

    const {
      includeUniques,
      minWordLength,
      maxWordLength,
      exactWordLength,
      wordStartsWith,
      onlyPOS,
      sortBy
    } = props;

    this.wordsDict.forEach((word: LatinDictEntry) => {
      const { orth, pos } = word;

      let valid = this.validateWord(orth, pos, minWordLength, maxWordLength, exactWordLength, wordStartsWith, onlyPOS);

      if (!valid) return;

      LatinWordsList.push(orth);
    });

    if (sortBy === undefined) return LatinWordsList;

    LatinWordsList = this.sortLists(LatinWordsList, sortBy);

    return LatinWordsList;
  }

  public getEnglishWords(props: GetEnglishWords): string[] {
    let EnglishWordsList: string[] = [];

    const {
      minWordLength,
      maxWordLength,
      exactWordLength,
      wordStartsWith,
      onlyPOS,
      sortBy
    } = props;

    this.english.forEach((word: EnglishDictEntry) => {
      const { orth, pos } = word;

      let valid = this.validateWord(orth, pos, minWordLength, maxWordLength, exactWordLength, wordStartsWith, onlyPOS);

      if (!valid) return;

      EnglishWordsList.push(orth);
    });

    if (sortBy === undefined) return EnglishWordsList;

    EnglishWordsList = this.sortLists(EnglishWordsList, sortBy);

    return EnglishWordsList;
  }

  private sortLists(
    list: string[],
    sortBy: "alphabetical" | "alphabeticalReverse" | "length" | "lengthReverse"
  ): string[] {
    if (sortBy === "alphabetical") {
      list.sort((a: string, b: string) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
    } else if (sortBy === "alphabeticalReverse") {
      list.sort((a: string, b: string) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
      });
    } else if (sortBy === "length") {
      list.sort((a: string, b: string) => {
        if (a.length < b.length) return -1;
        if (a.length > b.length) return 1;
        return 0;
      });
    } else if (sortBy === "lengthReverse") {
      list.sort((a: string, b: string) => {
        if (a.length < b.length) return 1;
        if (a.length > b.length) return -1;
        return 0;
      });
    }

    return list;
  }

  private validateWord(
    word: string,
    pos: string,
    minWordLength?: number,
    maxWordLength?: number,
    exactWordLength?: number,
    wordStartsWith?: string[],
    onlyPOS?: string[]
  ): boolean {
    if (exactWordLength !== undefined && word.length !== exactWordLength)
      return false;
    if (minWordLength !== undefined && word.length < minWordLength) return false;
    if (maxWordLength !== undefined && word.length > maxWordLength) return false;

    if (onlyPOS !== undefined && !onlyPOS.includes(transPOS(pos))) return false;

    if (wordStartsWith !== undefined) {
      let found = false;
      wordStartsWith.forEach((start: string) => {
        if (word.startsWith(start)) found = true;
      });
      if (!found) return false;
    }

    return true;
  }
}

export { UseData };
