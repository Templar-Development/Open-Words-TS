const transNoun = (abb: any) => {
  let w = "";

  let kind: any = {
    S: "singular (only)", //rare
    M: "plural / multiple (only)", //rare
    A: "abstract idea",
    G: "group name (ex: Roman(s))",
    N: "proper name",
    P: "a person",
    T: "a thing",
    L: "location", //name of country / city
    W: "a place (where)",
    X: "unknown"
  };

  w = kind[abb];

  return w;
};

export default transNoun;
