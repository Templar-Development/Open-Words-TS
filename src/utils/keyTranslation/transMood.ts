const transMood = (abb: any) => {
  let w = "";

  let moods: any = {
    IND: "indicative",
    SUB: "subjunctive",
    IMP: "imperative",
    INF: "infinitive",
    X: "unknown"
  };

  w = moods[abb];

  return w;
};

export default transMood;
