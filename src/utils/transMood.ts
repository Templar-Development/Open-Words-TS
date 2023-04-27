const transMood = (abb: any) => {
  let w = "";

  let moods = {
    IND: "indicative",
    SUB: "subjunctive",
    IMP: "imperative",
    INF: "infinitive",
    X: ""
  };

  w = moods[abb];

  return w;
};

export default transMood;
