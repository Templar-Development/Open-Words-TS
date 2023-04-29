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

  public parseLine(line: any, direction: "lte" | "etl", formatted: boolean): any{
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

    return {"word": s, "defs": out}
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
  
              // If this stem is already in the match_stems list, add infl to that stem (if not already an infl in that stem list)
              for (let i = 0; i < matchStems.length; i++) {
                const mst = matchStems[i];
                if (stem === mst.st) {
                  isInMatchStems = true;
  
                  // So the matches a stem in the match_stems. Is it unique to that stem's infls. If so, append it to that stem's infls.
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
