import PrinciplePartFinderData from "../types/PrinciplePartFinderData";

class PrinciplePartFinder {

  constructor() {}
  // optimize, all verbs 4 parts end in us, if they have 1

  public findPrincipleParts(props: PrinciplePartFinderData): string[] {
    const { pos, type, gender, orth } = props;

    if (pos === "N") {
      if (type[0] === 1 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["a", "ae"]);
      } else if (type[0] === 2 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["us", "i"]);
      } else if (type[0] === 2 && type[1] === 2) {
        return this.setPrincipleParts(orth, ["um", "i"]);
      } else if (type[0] === 2 && type[1] === 3) {
        return this.setPrincipleParts(orth, ["", "i"]);
      } else if (type[0] === 2 && type[1] === 4) {
        if (gender === "M") {
          return this.setPrincipleParts(orth, ["us", "(i)"]);
        } else if (gender === "N") {
          return this.setPrincipleParts(orth, ["um", "(i)"]);
        }
      } else if (type[0] === 2 && type[1] === 5) {
        return this.setPrincipleParts(orth, ["us", ""]); // might need to add an i, not sure
      } else if ((type[0] === 2 && type[1] === 6) || type[1] === 7) {
        return this.setPrincipleParts(orth, ["os", "i"]);
      } else if (type[0] === 2 && type[1] === 8) {
        return this.setPrincipleParts(orth, ["on", "i"]);
      } else if (type[0] === 2 && type[1] === 9) {
        return this.setPrincipleParts(orth, ["us", "i"]);
      } else if (
        (type[0] === 3 && type[1] === 1) ||
        type[1] === 2 ||
        type[1] === 3 ||
        type[1] === 4
      ) {
        return this.setPrincipleParts(orth, ["", "is"]);
      } else if (type[0] === 4 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["us", "us"]);
      } else if (type[0] === 4 && type[1] === 2) {
        return this.setPrincipleParts(orth, ["u", "us"]);
      } else if (type[0] === 4 && type[1] === 3) {
        return this.setPrincipleParts(orth, ["us", "u"]);
      } else if (type[0] === 5 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["es", "ei"]);
      } else if (type[0] === 9 && type[1] === 8) {
        return this.setPrincipleParts(orth, ["", ""], "abbreviation");
      } else if (type[0] === 9 && type[1] === 9) {
        return this.setPrincipleParts(orth, ["", ""], "undeclined");
      }
    }

    if (pos === "ADJ") {
    }

    if (pos === "V" || pos === "VPAR") {
      if (type[0] === 1 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["o", "are", "i", "us"]);
      } else if (type[0] === 2 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["eo", "ere", "i", "us"]);
      } else if (type[0] === 3 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["o", "ere", "i", "us"]);
      } else if (type[0] === 3 && type[1] === 2) {
        return this.setPrincipleParts(orth, ["o", "re", "i", "us"]);
      } else if (type[0] === 3 && type[0] === 3) {
        return this.setPrincipleParts(orth, ["o", "eri", "i", "us"]);
      } else if (type[0] === 3 && type[1] === 4) {
        return this.setPrincipleParts(orth, ["o", "ire", "i", "us"]);
      } else if (type[0] === 5 && type[1] === 2) {
        return this.setPrincipleParts(orth, ["um", "esse", "i", ""]);
      } else if (type[0] === 6 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["o", "re", "i", "us"]);
      } else if (type[0] === 6 && type[1] === 2) {
        return this.setPrincipleParts(orth, ["o", "le", "i", ""]);
      } else if (type[0] === 7 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["o", "", "", ""]);
      } else if (type[0] === 7 && type[1] === 2) {
        return this.setPrincipleParts(orth, ["am", "iam", "", ""]);
      } else if (type[0] === 7 && type[1] === 3) {
        return this.setPrincipleParts(orth, ["o", "se", "", ""]);
      } else if (type[0] === 8 && type[1] === 1) {
        return this.setPrincipleParts(orth, ["o", "are", "i", ""]);
      } else if (type[0] === 8 && type[1] === 2) {
        return this.setPrincipleParts(orth, ["o", "ere", "", ""]);
      } else if (type[0] === 8 && type[1] === 3) {
        return this.setPrincipleParts(orth, ["o", "ere", "i", ""]);
      } else if (type[0] === 9 && type[1] === 9) {
        return this.setPrincipleParts(orth, ["", "", "", ""], "undeclined");
      }
    }

    // if no match is found return the original orth
    return orth;
  }

  private setPrincipleParts(orths: string[], endings: string[], specialCase?: string): string[] {
    const orthsWithParts: string[] = [];

    if (endings.every((ending) => ending === "")) {
      return [`${orths[0]} | ${specialCase}`]
    }

    for (const orth in orths) {
      if (orths[orth] === "" || orths[orth] === "zzz") {
        orthsWithParts.push("---");
      } else {
        orthsWithParts.push(orths[orth] + endings[orth]);
      }
    }

    return orthsWithParts;
  }
}

export { PrinciplePartFinder };
