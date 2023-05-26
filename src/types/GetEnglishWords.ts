import PartOfSpeech from "./PartOfSpeech";

interface GetEnglishWords {
  minWordLength?: number;
  maxWordLength?: number;
  exactWordLength?: number;
  wordStartsWith?: string[];
  onlyPOS?: PartOfSpeech[];
  sortBy?: "alphabetical" | "alphabeticalReverse" | "length" | "lengthReverse";
}

export default GetEnglishWords;