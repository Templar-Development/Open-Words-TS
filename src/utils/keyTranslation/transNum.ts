const transNum = (abb: any) => {
  let w = "";

  let sort: any = {
    CARD: "cardinal",
    ORD: "ordinal",
    DIST: "distributive",
    ADVERB: "numeral adverb",
    X: "unknown"
  };

  w = sort[abb];

  return w;
};

export default transNum;
