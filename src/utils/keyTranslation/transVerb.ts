const transVerb = (abb: any) => {
  let w = "";

  let kind: any = {
    TO_BE: "to be (esse)",
    TO_BEING: "to being (esse)",
    GEN: "takes genitive",
    DAT: "takes dative",
    ABL: "takes ablative",
    TRANS: "transitive",
    INTRANS: "intransitive",
    IMPERS: "impersonal (It/They/God)",
    DEP: "deponent",
    SEMIDEP: "semi-deponent",
    PERFDEF: "perfect definite",
    X: "unknown"
  };

  w = kind[abb];

  return w;
};

export default transVerb;
