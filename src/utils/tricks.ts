/**
 *  Corresponding to Whitaker's Words tricks_package.adb
 */

import Characters from "../data/types/Characters";

type SingleChar = Characters | Uppercase<Characters>;

class Tricks {
  constructor() {}

  public isAVowel(character: SingleChar): boolean {
    let lowerCaseCharacter = character.toLowerCase();

    // Y is a vowel if it does not come before another vowel

    switch (lowerCaseCharacter) {
      case "a":
      case "e":
      case "i":
      case "o":
      case "u":
      case "y":
        return true;
      default:
        return false;
    }
  }

  public isARomanDigit(character: SingleChar): boolean {
    let lowerCaseCharacter = character.toLowerCase();

    // U can sometimes be used as a roman digit, but is not common

    switch (lowerCaseCharacter) {
      case "i":
      case "v":
      case "x":
      case "l":
      case "c":
      case "d":
      case "m":
        return true;
      default:
        return false;
    }
  }

  public romanDigitToNumber(character: SingleChar): number {
    let lowerCaseCharacter = character.toLowerCase();

    // U can sometimes be used instead of V, but is not common

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

  public onlyRomanDigits(text: string): boolean {
    for (const char of text) {
      if (!this.isARomanDigit(char as SingleChar)) {
        return false;
      }
    }

    return true;
  }

  //TODO: improve this code
  public evaluateRomanNumerals(text: string): number {
    let total: number = 0;
    const romanNumerals: string = text.toUpperCase();
    let currentNumeral: number = romanNumerals.length - 1;

    if (!this.onlyRomanDigits(romanNumerals)) {
      return 0;
    }

    /**
     * Numerals in a string are added: CC = 200 ; CCX = 210.
     * One numeral to the left of a larger numeral is subtracted: IX = 9 ; XL = 40.
     *
     * Subtract only a single letter from a single numeral.
     * VIII for 8, not IIX; 19 is XIX, not IXX.
     *
     * Subtract only powers of ten (I, X, or C, but not V or L or D).
     * Not VL for 45, but XLV; not LD for 450, but CDL.
     *
     * Don't subtract a number from one more than 10 times greater.
     * Only subtract I from V or X; only X from L or C
     * Not IL for 49, but XLIX; MIM is illegal.
     *
     * Only if any numeral preceding is at least 10 times greater.
     * Not VIX for 14, but XIV
     * Not IIX, but VIII
     * Only if any numeral following is smaller
     * Not XCL for 140, but CXL
     */

    while (currentNumeral >= 0) {
      /**
       * Legal in ones position:
       *
       * I
       * II
       * III
       * IIII IV
       * V
       * VI
       * VII
       * VIII
       * VIII IX
       */

      // Ones
      if (romanNumerals[currentNumeral] === "I") {
        total += 1;
        currentNumeral--;
        if (currentNumeral < 0) break;
        while (romanNumerals[currentNumeral] === "I") {
          total += 1;
          if (total >= 5) {
            return 0;
          }
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
      } else if (romanNumerals[currentNumeral] === "V") {
        total += 5;
        currentNumeral--;
        if (currentNumeral < 0) break;
        if (romanNumerals[currentNumeral] === "I" && total === 5) {
          total -= 1;
          currentNumeral--;
          if (currentNumeral < 0) break;
        } else if (
          romanNumerals[currentNumeral] === "I" ||
          romanNumerals[currentNumeral] === "V"
        ) {
          return 0;
        }
      } else {
        return 0;
      }

      /**
       * Legal in tens position:
       *
       * X
       * XX
       * XXX
       * XXXX XL
       * L
       * LX
       * LXX
       * LXXX
       * LXXXX XC
       */

      // Tens
      if (romanNumerals[currentNumeral] === "X") {
        total += 10;
        currentNumeral--;
        if (currentNumeral < 0) break;
        while (romanNumerals[currentNumeral] === "X") {
          total += 10;
          if (total >= 50) {
            return 0;
          }
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (romanNumerals[currentNumeral] === "I" && total === 10) {
          total -= 1;
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (romanNumerals[currentNumeral] === "V") {
          total -= 5;
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
      }

      if (romanNumerals[currentNumeral] === "L") {
        total += 50;
        currentNumeral--;
        if (currentNumeral < 0) break;
        if (romanNumerals[currentNumeral] === "X" && total <= 59) {
          total -= 10;
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (
          romanNumerals[currentNumeral] === "I" ||
          romanNumerals[currentNumeral] === "V" ||
          romanNumerals[currentNumeral] === "X" ||
          romanNumerals[currentNumeral] === "L"
        ) {
          return 0;
        }

        if (romanNumerals[currentNumeral] === "C") {
          total += 100;
          currentNumeral--;
          if (currentNumeral < 0) break;
          if (romanNumerals[currentNumeral] === "X" && total === 100) {
            total -= 10;
            currentNumeral--;
            if (currentNumeral < 0) break;
          }
        }

        if (
          romanNumerals[currentNumeral] === "I" ||
          romanNumerals[currentNumeral] === "V" ||
          romanNumerals[currentNumeral] === "X" ||
          romanNumerals[currentNumeral] === "L"
        ) {
          return 0;
        }
      }

      if (romanNumerals[currentNumeral] === "C") {
        total += 100;
        currentNumeral--;
        if (currentNumeral < 0) break;
        while (romanNumerals[currentNumeral] === "C") {
          total += 100;
          if (total >= 500) {
            return 0;
          }
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (romanNumerals[currentNumeral] === "X" && total <= 109) {
          total -= 10;
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (
          romanNumerals[currentNumeral] === "I" ||
          romanNumerals[currentNumeral] === "V" ||
          romanNumerals[currentNumeral] === "X" ||
          romanNumerals[currentNumeral] === "L" ||
          romanNumerals[currentNumeral] === "C"
        ) {
          return 0;
        }
      }

      // Finish
      if (romanNumerals[currentNumeral] === "D") {
        total += 500;
        currentNumeral--;
        if (currentNumeral < 0) break;
        if (romanNumerals[currentNumeral] === "C" && total <= 599) {
          total -= 100;
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (romanNumerals[currentNumeral] === "M") {
          total += 1000;
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (romanNumerals[currentNumeral] === "C" && total <= 1099) {
          total -= 100;
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (
          romanNumerals[currentNumeral] === "I" ||
          romanNumerals[currentNumeral] === "V" ||
          romanNumerals[currentNumeral] === "X" ||
          romanNumerals[currentNumeral] === "L" ||
          romanNumerals[currentNumeral] === "C" ||
          romanNumerals[currentNumeral] === "D"
        ) {
          return 0;
        }
      }

      if (romanNumerals[currentNumeral] === "M") {
        total += 1000;
        currentNumeral--;
        if (currentNumeral < 0) break;
        while (romanNumerals[currentNumeral] === "M") {
          total += 1000;
          if (total >= 5000) {
            return 0;
          }
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (romanNumerals[currentNumeral] === "C" && total <= 1099) {
          total -= 100;
          currentNumeral--;
          if (currentNumeral < 0) break;
        }
        if (
          romanNumerals[currentNumeral] === "I" ||
          romanNumerals[currentNumeral] === "V" ||
          romanNumerals[currentNumeral] === "X" ||
          romanNumerals[currentNumeral] === "L" ||
          romanNumerals[currentNumeral] === "C" ||
          romanNumerals[currentNumeral] === "D" ||
          romanNumerals[currentNumeral] === "M"
        ) {
          return 0;
        }
      }
    }

    return total;
  }
}

export { Tricks };
