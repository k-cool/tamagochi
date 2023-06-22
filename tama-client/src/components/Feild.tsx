"use client";

import { useState } from "react";
import Dusty from "./dusty/Dusty";
import { DUSTTY_DATA } from "@/data/dustyData";

export default function Feild() {
  const [status, setStatus] = useState(DUSTTY_DATA);

  return (
    <div className="flex justify-center items-center w-full h-[250px] bg-slate-600 rounded-md">
      <Dusty status={status} />
    </div>
  );
}
