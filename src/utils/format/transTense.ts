const transTense = (abb: any) => {
  let w = "";

  let tenses: any = {
    PRES: "present",
    IMPF: "imperfect",
    PERF: "perfect",
    FUT: "future",
    FUTP: "future perfect",
    PLUP: "pluperfect",
    INF: "infinitive",
    X: "unknown"
  };

  w = tenses[abb];

  return w;
};

export default transTense;
