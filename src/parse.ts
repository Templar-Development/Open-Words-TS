/**
 * Corresponding to Whitaker's Words parse.adb file
 */

import WordsDict from "./data/dictLine";
import LatinAddons from "./data/addons";
import Stems from "./data/stemList";
import Uniques from "./data/uniques";
import Inflects from "./data/inflects";

import transDeclensions from "./utils/transDeclensions";
import transGender from "./utils/transGender";
import transMood from "./utils/transMood";
import transNumber from "./utils/transNumber";
import transTense from "./utils/transTense";
import transVoice from "./utils/transVoice";

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
      out = this.formatOutput(out);
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
      out = this.findForms(word, false);
    }

    return out;
  }

  private englishToLatin(word: string): any {
    //Find Latin word from English definition

    let out: any = [];

    return out;
  }

  private formatOutput(out: any[], type: string = "condensed") {
    const newOut = [];

    for (let word of out) {
      let obj: any = {
        orth: [],
        senses: word['w']['senses'],
        infls: []
      };

      // Format the orth of the new object
      if ('parts' in word['w']) {
        obj.orth = word['w']['parts'];
      } else {
        obj.orth = [word['w']['orth']];
      }

      // Format the stems / inflections of the new object
      if ('stems' in word) {
        for (let stem of word['stems']) {
          let toAddInfls = [];
          for (let infl of stem['infls']) {

            // Ensure the infl isn't already in the infls
            let isInFormattedInfls: boolean = false;
            for (let formattedInfl of toAddInfls) {
              if (infl['form'] == formattedInfl['form']) {
                isInFormattedInfls = true;
              }
            }

            if (!isInFormattedInfls) {
              toAddInfls.push({
                ending: infl['ending'],
                pos: infl['pos'],
                form: infl['form']
              });
            }
          }

          for (let formattedInfl of toAddInfls) {
            if (!obj['infls'].includes(formattedInfl)) {
              obj['infls'].push(formattedInfl);
            }
          }
        }
      } else {
        word['w']['form'] = word['w']['pos'];
      }

      // If we still don't have any inflections associated with the object
      if (obj['infls'].length == 0) {
        obj['infls'] = [{
          form: word['w']['form'],
          ending: '',
          pos: word['w']['pos']
        }];
      }

      // Format the morphological data for the word forms into a more useful output
      obj = this.formatMorph(obj);

      newOut.push(obj);
    }

    return newOut;
  }

  private formatMorph(word: any): any {
    for (let infl of word.infls) {
      // Translate form
      infl.form = this.formatForm(infl.form, infl.pos);

      // Set part of speech
      switch (infl.pos) {
        case "N":
          infl.pos = "noun";
          break;
        case "V":
          infl.pos = "verb";
          break;
        case "VPAR":
          infl.pos = "participle";
          break;
        case "ADJ":
          infl.pos = "adjective";
          break;
        case "PREP":
          infl.pos = "adjective";
          break;
        case "PRON":
          infl.pos = "pronoun";
          break;
        case "INTERJ":
          infl.pos = "interjection";
          break;
        case "NUM":
          infl.pos = "number";
          break;
        case "CONJ":
          infl.pos = "conjunction";
          break;
        case "PREP":
          infl.pos = "preposition";
          break;
      }
    }

    return word;
  }

  private formatForm(form: any, pos: any): any {
    /**
     * Format form data to be more useful and relevant
     * 
     * Nouns, Adjectives
     * - declension: nominative, vocative, genitive, accusative, dative, ablative, locative
     * - gender: male, female, neuter
     * - number: singular, plural
     * 
     * Verbs
     * - person: 1, 2, 3
     * - number: singular, plural
     * - mood: indicative, subjunctive
     * - voice: active, passive
     * - tense: present, imperfect, perfect, future, future perfect, pluperfect, infinitive, imperative
     * 
     * Participles
     * - declension: nominative, vocative, genitive, accusative, dative, ablative, locative
     * - gender: male, female, neuter
     * - number: singular, plural
     * - tense: present, perfect, future
     * - voice: active, passive
     */

    let formatted: any = {};

    if (["N", "PRON", "ADJ", "NUM"].includes(pos)) {
      // Ex. "ACC S C"
      const formArr = form.split(" ");
      if (formArr.length === 3) {
        formatted = {
          declension: transDeclensions(formArr[0]),
          number: transNumber(formArr[1]),
          gender: transGender(formArr[2])
        };
      } else {
        formatted = {
          form: form
        };
      }
    } else if (pos === "V") {
      // Ex: "FUT   ACTIVE  IND  3 S"
      if (form.length === 22) {
        formatted = {
          tense: transTense(form.slice(0, 6).trim()),
          voice: transVoice(form.slice(6, 14).trim()),
          mood: transMood(form.slice(14, 19).trim()),
          person: parseInt(form.slice(19, 21).trim()),
          number: transNumber(form.slice(21).trim())
        };
      } else {
        formatted = {
          form: form
        };
      }
    } else if (pos === "VPAR") {
      // Ex: "VOC P N PRES ACTIVE  PPL"
      if (form.length === 24) {
        formatted = {
          declension: transDeclensions(form.slice(0, 4).trim()),
          number: transNumber(form.slice(4, 6).trim()),
          gender: transGender(form.slice(6, 8).trim()),
          tense: transTense(form.slice(8, 13).trim()),
          voice: transVoice(form.slice(13, 21).trim())
        };
      } else {
        formatted = {
          form: form
        };
      }
    } else if (["ADV", "INTERJ", "CONJ", "PREP", "X", "P"].includes(pos)) {
      formatted = {
        form: form
      };
    } else {
      formatted = {
        form: form
      };
    }
    return formatted;
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
      // !!!: if results are wrong might need to implement getWordEnds
      out = this.lookupStems(stems, out);
    } else {
      out = this.lookupStems(stems, out);
    }
    
    if (out.length === 0 && !reduced) {
      let rOut: any = this.reduce(s);
      // if there is more data after reducing, extend out
      if (rOut) {
        out.extend(rOut);
      }
    }

    return out;
  }

  private reduce(s: string): any {
    // Reduce the stem with suffixes and try again

    let out: any = [];
    let isUnique: boolean = false;
    let foundNewMatch: boolean = false;
    let infls = [];

    // For each inflection match, check prefixes and suffixes
    for (const prefix of this.addons['prefixes']) {
      if (s.startsWith(prefix['orth'])) {
        s = s.replace(`^${prefix['orth']}`, '');
        out.push({ w: prefix, stems: [], addon: 'prefix' });
        break;
      }
    }

    for (const suffix of this.addons['suffixes']) {
      if (s.endsWith(suffix['orth'])) {
        s = s.replace(`${suffix['orth']}$`, '');
        out.push({ w: suffix, stems: [], addon: 'suffix' });
        break;
      }
    }

    out = this.findForms(s, true);

    // Has reducing input string given us useful data?
    for (const word of out) {
      if (word['stems'].length > 0) {
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
        if (stem.st.wid === word.id) {
          let wordIsInOut = false;
          for (let i = 0; i < out.length; i++) {
            const w = out[i];
            if ('id' in w['w'] && word['id'] === w['w']['id'] || w['w']['orth'] === word['orth']) {
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
