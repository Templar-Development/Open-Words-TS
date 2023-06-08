class EnglishToLatin {
  private responseLimit: number;

  constructor(private english: any[], private wordsDict: any[]) {
    this.responseLimit = 6;
  }

  public englishToLatin(word: string): any {
    // Find Latin word from English definition
    let listOfWords: any[] = [];
    let out: any[] = [];

    for (const line of this.english) {
      if (line.orth.toLowerCase() === word.toLowerCase()) {
        listOfWords.push(line);
      }
    }

    listOfWords = this.weighWords(listOfWords);

    // words like "here" have duplicate defs, which should be removed to make space for more options
    listOfWords = this.removeDuplicateWords(listOfWords);

    // if there are more than 6 words in the list, keep the top 6
    // other words are probably rare/irrelevant or wrong
    if (listOfWords.length > this.responseLimit) {
      listOfWords = listOfWords.slice(0, this.responseLimit);
    }

    // lookup the def of the words in the dict, using wid
    out = this.findEnglishWordDefs(listOfWords);

    return out;
  }

  private weighWords(listOfWords: any[]): any[] {
    // Sorts words as specified in english.ts

    listOfWords.sort((a: any, b: any) => {
      return this.calculateTrueFrequency(b) - this.calculateTrueFrequency(a);
    });

    return listOfWords;
  }

  private removeDuplicateWords(listOfWords: any[]): any[] {
    const entriesMap = new Map<string, any>();

    for (const entry of listOfWords) {
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

  private findEnglishWordDefs(listOfWords: any[]): any[] {
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
