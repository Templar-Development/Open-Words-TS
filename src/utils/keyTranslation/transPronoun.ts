const transPronoun = (abb: any) => {
  let w = "";

  let kind: any = {
    PERS: "personal",
    DEMONS: "demonstrative",
    REL: "relative",
    INTERR: "interrogative",
    INDEF: "indefinite",
    REFLEX: "reflexive",
    ADJECT: "adjectival",
    X: "unknown"
  };

  w = kind[abb];

  return w;
};

export default transPronoun;
