"use client";

import { useState } from "react";
import Dusty from "./dusty/Dusty";
import { DUSTTY_DATA } from "@/data/dustyData";
import ChatBox from "./ui/ChatBox";

export default function Feild() {
  const [status, setStatus] = useState(DUSTTY_DATA);

  return (
    <div className="relative flex justify-center items-end w-full h-[250px] pb-[30px] px-[20px] pt-[20px] bg-slate-600 rounded-md overflow-hidden">
      <ChatBox />
      <Dusty status={status} />
    </div>
  );
}
