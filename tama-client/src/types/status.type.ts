export type DustyStatus = {
  name: string;
  age: number;
  size: number;
  mbti: {
    ie: number;
    ns: number;
    ft: number;
    pj: number;
  };
};

export type MBTI = DustyStatus["mbti"];
