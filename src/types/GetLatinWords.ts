interface GetLatinWords {
  includeUniques: boolean;
  minWordLength?: number;
  maxWordLength?: number;
  exactWordLength?: number;
  wordStartsWith?: string[];
  onlyPOS?: string[];
  sortBy?: "alphabetical" | "alphabeticalReverse" | "length" | "lengthReverse";
}

export default GetLatinWords;
