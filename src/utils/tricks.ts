type Characters = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

class Tricks {
  constructor() {}

  private isAVowel(character: Characters): boolean {
    const lowerCaseCharacter: string = character.toLowerCase();
    return /^[aeiou]$/.test(lowerCaseCharacter);
  }

  private isARomanDigit(character: Characters): boolean {
    const lowerCaseCharacter: string = character.toLowerCase();
    return /^[ivxlcdm]$/.test(lowerCaseCharacter);
  }

  private romanDigitToNumber(character: Characters): number {
    const lowerCaseCharacter: string = character.toLowerCase();
    switch (lowerCaseCharacter) {
      case "i":
        return 1;
      case "v":
        return 5;
      case "x":
        return 10;
      case "l":
        return 50;
      case "c":
        return 100;
      case "d":
        return 500;
      case "m":
        return 1000;
      default:
        return 0;
    }
  }

  private onlyRomanDigits(text: string): boolean {
    return /^[ivxlcdm]+$/i.test(text);
  }

  private switchFirstIOrJ(word: string): string {
    if (word[0] === "i") {
      return "j" + word.slice(1);
    }

    if (word[0] === "j") {
      return "i" + word.slice(1);
    }

    return word;
  }

  private switchUorV(word: string): string {
    if (!word.includes("u") && word.includes("v")) {
      word = word.replace(/v/g, "u");
      return word;
    }

    word = word.replace(/u/g, "v");
    return word;
  }

  public evaluateRomanNumerals(St: string): number {
    let total: number = 0;
    const numeralString: string = St.toUpperCase();
    let prevNum: number = 0;

    if (!this.onlyRomanDigits(numeralString)) {
      return 0;
    }

    for (let i = numeralString.length - 1; i >= 0; i--) {
      const character: Characters = numeralString[i] as Characters;
      const characterValue: number = this.romanDigitToNumber(character);
      console.log(characterValue + " " + character);
      console.log(total);

      if (characterValue < prevNum) {
        total -= characterValue;
      } else {
        total += characterValue;
        prevNum = characterValue;
      }

      if (total >= 5000) {
        return 0;
      }

      if (
        (character === "V" || character === "L" || character === "D") &&
        i > 0 &&
        this.romanDigitToNumber(numeralString[i - 1] as Characters) < characterValue
      ) {
        total -= this.romanDigitToNumber(numeralString[i - 1] as Characters);
        i--;
      }
    }

    return total;
  }
}

export { Tricks };
