const transVoice = (abb: any) => {
  let w = "";

  let voices: any = {
    ACTIVE: "active",
    PASSIVE: "passive",
    X: "unknown"
  };

  w = voices[abb];

  return w;
};

export default transVoice;
