const transTense = (abb: any) => {
  let w = "";

  let tenses = {
    PRES: "present",
    IMPF: "imperfect",
    PERF: "perfect",
    FUT: "future",
    FUTP: "future perfect",
    PLUP: "pluperfect",
    INF: "infinitive",
    X: ""
  };

  w = tenses[abb];

  return w;
};

export default transTense;
