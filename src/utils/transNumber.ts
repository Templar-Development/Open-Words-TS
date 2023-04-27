const transNumber = (abb: any) => {
  let w = "";

  let numbers = {
    S: "singular",
    P: "plural",
    X: ""
  };

  w = numbers[abb];

  return w;
};
