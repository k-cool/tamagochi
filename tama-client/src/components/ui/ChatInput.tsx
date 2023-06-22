"use client";

import { setMessage, setShowChat } from "@/redux/chatSlice";
import axios from "axios";
import React, { use, useState } from "react";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

interface ChatInputProps {
  name: string;
}

export default function ChatInput({ name }: ChatInputProps) {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput(() => value);
  };

  const sendMessage = async () => {
    const result = await axios
      .post("/api/chat", { query: userInput })
      .then((res) => res.data)
      .catch(console.error);

    dispatch(setShowChat(false));
    dispatch(setMessage(result));
    dispatch(setShowChat(true));
    setUserInput(() => "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-md py-2 px-4">
      <input
        className="flex-1 h-[35px] text-lg"
        type="text"
        placeholder={`${name} 에게 말을 걸어보세요!`}
        value={userInput}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
      />
      <button
        className="p-3 rounded-full cursor-pointer hover:bg-neutral-300"
        onClick={sendMessage}
      >
        <BsFillChatLeftDotsFill size={24} />
      </button>
    </div>
  );
}
