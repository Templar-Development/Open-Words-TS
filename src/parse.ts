import WordsDict from "./data/dictLine";
import LatinAddons from "./data/addons";
import Stems from "./data/stemList";
import Uniques from "./data/uniques";
import Inflects from "./data/inflects";

class Parse {
  constructor(
    wordsDict = WordsDict,
    addons = LatinAddons,
    stems = Stems,
    uniques = Uniques,
    inflects = Inflects
  ) {
    // Sort by length
    stems.sort((a: any, b: any) => a.length - b.length);

    // Sort by length of ending
    inflects.sort((a: any, b: any) => a.ending.length - b.ending.length);
  }

  public parseLine(line: any, direction: "lte" | "etl", formatted: boolean): any{
    // Prase a line of words delimitated by spaces

    let out = [];

    //temp vars (should be passed from search.ts)
    formatted  = true;
    direction = "lte"

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

    return {'word': s, 'defs': out}
  }

  private latinToEnglish(word: string): any {
    //Find definition and word formation from Latin word

    let isUnique = false;
    let out: any = [];

    let split = this.splitEnclitic(word);
    word = split[0];
    out = split[1];


    // check against list of uniques
    for (const unique of Uniques) {
      if (word == unique.orth) {
        out.push({ 'w': unique, "stems": [] });
        isUnique = true;
        console.log(out)
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

  private splitEnclitic(s: string): any {
    //Split enclitic ending from word

    let out: any = [];

    // Test the different tackons / packons as specified in addons.ts
    for (const e of LatinAddons.tackons) {
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
      for (const e of LatinAddons.packons) {
        if (s.endsWith(e.orth)) {
          out.push({ 'w': e });
          s = s.replace(new RegExp(e.orth + "$"), "");
          break;
        }
      }
    } else {
      for (const e of LatinAddons.not_packons) {
        if (s.endsWith(e.orth)) {
          out.push({ 'w': e });
          s = s.replace(new RegExp(e.orth + "$"), "");
          break;
        }
      }
    }

    return [s, out];
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
