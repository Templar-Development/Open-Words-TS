import transDeclensions from "./keyTranslation/transDeclensions";
import transGender from "./keyTranslation/transGender";
import transMood from "./keyTranslation/transMood";
import transNumber from "./keyTranslation/transNumber";
import transTense from "./keyTranslation/transTense";
import transVoice from "./keyTranslation/transVoice";
import transPOS from "./keyTranslation/transPOS";

class Formatter {
  constructor(private PrinciplePartFinder: any) {}

  //TODO add format types
  public formatOutput(out: any[], type: string = "condensed") {
    let cleanOutput: any = [];

    for (let word of out) {
      let def: any = {
        orth: [],
        senses: word["w"]["senses"],
        infls: [],
        info: {
          id: "",
          type: "",
          pos: ""
        }
      };

      if (word["w"]["id"] != undefined) {
        def.info.id = word["w"]["id"];
      } else if (word["w"]["wid"] != undefined) {
        def.info.id = word["w"]["wid"];
      }

      if (word["w"]["n"] != undefined) {
        def.info.type = word["w"]["n"];
      }

      if (word["w"]["pos"] != undefined) {
        def.info.pos = word["w"]["pos"];
      }

      //!!! maybe can remove this do testing. This might be able to be replaced with principlePartFinder
      // Format the orth of the new object
      if ("parts" in word["w"]) {
        def.orth = word["w"]["parts"];
      } else {
        def.orth = [word["w"]["orth"]];
      }

      // Format the stems / inflections of the new object
      if ("stems" in word) {
        for (let stem of word["stems"]) {
          let collectedInflList = [];
          for (let infl of stem["infls"]) {
            // Ensure the infl isn't already in the infls
            let isInFormattedInfls: boolean = false;
            for (let formattedInfl of collectedInflList) {
              if (infl["form"] == formattedInfl["form"]) {
                isInFormattedInfls = true;
              }
            }

            if (!isInFormattedInfls) {
              collectedInflList.push({
                stem: stem["st"]["orth"],
                ending: infl["ending"],
                pos: infl["pos"],
                form: infl["form"]
              });
            }
          }

          for (let formattedInfl of collectedInflList) {
            if (!def["infls"].includes(formattedInfl)) {
              def["infls"].push(formattedInfl);
            }
          }
        }
      } else {
        word["w"]["form"] = word["w"]["pos"];
      }

      // If we still don't have any inflections associated with the object
      if (def["infls"].length == 0) {
        def["infls"] = [
          {
            form: word["w"]["form"],
            ending: "",
            pos: word["w"]["pos"]
          }
        ];
      }

      // Format the morphological data for the word forms into a more useful output
      def = this.formatMorph(def);

      // Find the principle parts of the word
      let orth = def["orth"];
      let pos = def["info"]["pos"];
      let type = def["info"]["type"];

      if (pos == "V" || pos == "VPAR" || pos == "N" || pos == "ADJ") {
        let principleParts = this.PrinciplePartFinder.findPrincipleParts({pos, type, orth});
        def.orth = principleParts;
      }

      cleanOutput.push(def);
    }

    // Because of different wid (word ids) in raw output of infls, once formatted, duplicate infls can occur and must be removed
    //ex: diem
    cleanOutput = this.removeDuplicateInfls(cleanOutput);
    cleanOutput = this.removeEmptyStrings(cleanOutput);

    return cleanOutput;
  }

  private removeEmptyStrings(cleanOutput: any): any {
    for (const word of cleanOutput) {
      word.orth = word.orth.filter((x: any) => x !== "");
    }

    return cleanOutput;
  }

  private removeDuplicateInfls(words: any): any {
    const cleanOutput: any = [];

    for (const word of words) {
      const formattedDef: any = {
        orth: word.orth,
        senses: word.senses,
        infls: [],
        info: {
          id: word.info.id,
          type: word.info.type,
          pos: word.info.pos
        }
      };

      const inflMap = new Map<string, any>();

      for (const infl of word.infls) {
        const key = `${infl.stem}-${infl.ending}-${infl.pos}-${infl.form.declension}-${infl.form.number}-${infl.form.gender}`;
        if (!inflMap.has(key)) {
          inflMap.set(key, infl);
        }
      }

      formattedDef.infls = Array.from(inflMap.values());
      cleanOutput.push(formattedDef);
    }
    return cleanOutput;
  }

  private formatMorph(out: any): any {
    for (let infl of out.infls) {
      // Translate form
      infl.form = this.formatForm(infl.form, infl.pos);

      // Set part of speech
      infl.pos = transPOS(infl.pos);
    }
    return out;
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

  public sanitize(string: string): string {
    //sanitize the input string from all punct and numbers, make lowercase

    let sanitizedString = string.toLowerCase();
    sanitizedString = sanitizedString.replace(/[^a-z ]/g, "");
    sanitizedString = sanitizedString.replace(/[0-9]/g, "");
    sanitizedString = sanitizedString.replace(/\s+/g, " ");

    return sanitizedString;
  }
}

export { Formatter };
