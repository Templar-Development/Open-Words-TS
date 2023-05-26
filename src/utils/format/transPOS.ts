/**
 * Translates dictionary part of speech codes to human-readable form.
 */

const transPOS = (pos: string): string => {
  switch (pos) {
    case "N":
      pos = "noun";
      break;
    case "V":
      pos = "verb";
      break;
    case "VPAR":
      pos = "participle";
      break;
    case "ADJ":
      pos = "adjective";
      break;
    case "PREP":
      pos = "preposition";
      break;
    case "PRON":
      pos = "pronoun";
      break;
    case "INTERJ":
      pos = "interjection";
      break;
    case "NUM":
      pos = "number";
      break;
    case "CONJ":
      pos = "conjunction";
      break;
    case "PREP":
      pos = "preposition";
      break;
    case "ADV":
      pos = "adverb";
      break;
    case "INT":
      pos = "number";
      break;
    case "X":
      pos = "unknown";
  }

  return pos;
};

export default transPOS;
