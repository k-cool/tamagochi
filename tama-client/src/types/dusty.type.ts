export type DustyData = {
  name: string;
  age: number;
  size: number;
  mbti: {
    ie: number;
    ns: number;
    ft: number;
    pj: number;
  };
  status: {
    satiety: number;
    lastFeed: Date;
  };
};

export type MBTI = DustyData["mbti"];
export type Status = DustyData["status"];
