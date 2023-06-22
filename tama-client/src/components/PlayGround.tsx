"use client";

import { useState } from "react";
import Dusty from "./Dusty";

export default function PlayGround() {
  const [status, setStatus] = useState({
    name: "귀염둥이",
    age: 1,
    size: 200,
    mbti: {
      ie: 20,
      ns: 70,
      ft: 10,
      pj: 90,
    },
  });

  const [suppriseSwitch, setSuppriseSwitch] = useState(false);

  return (
    <div className="relative w-full h-full">
      <Dusty status={status} suppriseSwitch={suppriseSwitch} />

      <div className="fixed bottom-[50px] right-[50px]">
        <button
          className="w-[100px] h-[40px] bg-white cursor-pointer hover:opacity-50"
          onClick={() => setSuppriseSwitch((prev) => !prev)}
        >
          supprise
        </button>
      </div>
    </div>
  );
}
