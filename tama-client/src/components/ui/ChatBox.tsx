"use client";

import { setShowChat } from "@/redux/chatSlice";
import { RootState } from "@/redux/store";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";

export default function ChatBox() {
  const dispatch = useDispatch();
  const { showChat, message } = useSelector((state: RootState) => state.chat);

  return (
    <>
      {showChat && (
        <div className="absolute top-[10px] w-[80%] h-[100px] p-4 bg-white rounded-lg">
          <TypeAnimation
            sequence={[
              message,
              () => {
                setTimeout(() => {
                  dispatch(setShowChat(false));
                }, 3000);
              },
            ]}
            wrapper="p"
            speed={70}
            style={{ fontSize: "1em", display: "inline-block" }}
          />
          <AiFillCaretDown
            className="absolute bottom-[-20px] left-[60%] text-white"
            size={30}
          />
        </div>
      )}
    </>
  );
}
