const transDeclensions = (abb: any) => {
  let w = "";

  let declensions: any = {
    NOM: "nominative",
    VOC: "vocative",
    GEN: "genitive",
    DAT: "dative",
    ACC: "accusative",
    LOC: "locative",
    ABL: "ablative",
    X: ""
  };

  w = declensions[abb];

  return w;
};

export default transDeclensions;
