/**
 * C: common (masculine and/or feminine)
 * X: all, none, or unknown
 */

const transGender = (abb: any) => {
  let w = "";

  let genders: any = {
    M: "masculine",
    F: "feminine",
    N: "neuter",
    C: "masculine and/or feminine",
    X: "unknown"
  };

  w = genders[abb];

  return w;
};

export default transGender;
