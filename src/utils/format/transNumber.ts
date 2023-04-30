const transNumber = (abb: any) => {
  let w = "";

  let numbers: any = {
    S: "singular",
    P: "plural",
    X: ""
  };

  w = numbers[abb];

  return w;
};

export default transNumber;
