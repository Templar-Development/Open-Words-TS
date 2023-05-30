const transComparison = (abb: any) => {
  let w = "";

  let kind: any = {
    POS: "positive",
    COMP: "comparative",
    SUPER: "superlative",
    X: "unknown"
  };

  w = kind[abb];

  return w;
};

export default transComparison;
