class EnglishToLatin {
  constructor(private english: any, private wordsDict: any) {}

  public englishToLatin(searchWord: string): any {
    // Find Latin word from English definition
    let listOfWords: any = [];
    let out: any = [];

    //TODO: if word cant be found, use old method of finding word (searching in defs)
    for (const word of this.english) {
      if (word.orth.toLowerCase() === searchWord.toLowerCase()) {
        listOfWords.push(word);
      }
    }

    listOfWords = this.weighWords(listOfWords);

    // words like "here" have duplicate defs, which should be removed to make space for more options
    listOfWords = this.removeDuplicateWords(listOfWords);

    // if there are more than 6 words in the list, keep the top 6
    // other words are probably rare/irrelevant or wrong
    if (listOfWords.length > 6) {
      listOfWords = listOfWords.slice(0, 6);
    }

    // lookup the def of the words in the dict, using wid
    out = this.findEnglishWordDefs(listOfWords);

    return out;
  }

  private weighWords(listOfWords: any): any {
    // Sorts words as specified in english.ts

    listOfWords.sort((a: any, b: any) => {
      const aVal = a.frequency + a.compound - a.semi;
      const bVal = b.frequency + b.compound - b.semi;
      return bVal - aVal;
    });

    return listOfWords;
  }

  private removeDuplicateWords(data: any): any {
    const entriesMap = new Map<string, any>();

    for (const entry of data) {
      const key = `${entry.wid}-${this.calculateTrueFrequency(entry)}`;
      const existingEntry = entriesMap.get(key);
      if (!existingEntry || entry.trueFrequency < existingEntry.trueFrequency) {
        entriesMap.set(key, entry);
      }
    }

    return Array.from(entriesMap.values());
  }

  private calculateTrueFrequency(word: any): number {
    return word.frequency + word.compound - word.semi;
  }

  private findEnglishWordDefs(listOfWords: any): any {
    return listOfWords
      .map((word: any) => {
        const foundDictLine = this.wordsDict.find(
          (dictLine: any) => dictLine.id === word.wid
        );
        return foundDictLine ? { w: foundDictLine, stems: [] } : null;
      })
      .filter(Boolean);
  }
}

export { EnglishToLatin };
