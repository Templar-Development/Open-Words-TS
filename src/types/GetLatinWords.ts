import PartOfSpeech from "./PartOfSpeech";

interface GetLatinWords {
  includeUniques: boolean;
  minWordLength?: number;
  maxWordLength?: number;
  exactWordLength?: number;
  wordStartsWith?: string[];
  onlyPOS?: PartOfSpeech[];
  sortBy?: "alphabetical" | "alphabeticalReverse" | "length" | "lengthReverse";
}

export default GetLatinWords;
