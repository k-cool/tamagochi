"use client";

import { useDidmountEffect } from "@/hooks/useDidMountEffect";
import { DustyStatus, MBTI } from "@/types/status.type";
import { getEyeColor } from "@/util/mbti";
import { useEffect, useState } from "react";

export interface DustyProps {
  status: DustyStatus;
  suppriseSwitch: boolean;
}

export default function Dusty({ status, suppriseSwitch }: DustyProps) {
  const { name, size, mbti } = status;

  const [dustySize, setDustySize] = useState(getDustySize(size));
  const { eyes, mouth } = dustySize;

  const faceColor = getBackgroundColor(mbti);
  const eyeColor = getEyeColor(faceColor);

  useDidmountEffect(() => {
    setDustySize((prev) => ({
      ...prev,
      eyeScale: 1.2,
    }));

    setTimeout(() => {
      setDustySize((prev) => ({
        ...prev,
        eyeScale: 1,
      }));
    }, 200);
  }, [suppriseSwitch]);

  const handleMouseDown = () => {
    setDustySize((prev) => ({ ...prev, totalScale: 1.2 }));
  };

  const handleMouseUp = () => {
    setDustySize((prev) => ({ ...prev, totalScale: 1 }));
  };

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ gap: `${dustySize.betweenNameAndFace}rem` }}
    >
      <p className="text-white">{name}</p>
      <div
        className="hover:border-4 hover:border-white"
        style={{
          boxSizing: "content-box",
          width: `${dustySize.faceSize}rem`,
          height: `${dustySize.faceSize}rem`,
          borderRadius: getDustyRadius(mbti.ie),
          backgroundColor: faceColor,
          transition: "scale ease 200ms",
          scale: dustySize.totalScale,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className={FACE_CLASSNAME}
          style={{
            gap: `${dustySize.betweenEyeAndMouth}rem`,
            transition: "scale ease 100ms",
            scale: dustySize.eyeScale,
          }}
        >
          <div
            className=""
            style={{
              scale: dustySize.eyeScale,
            }}
          >
            <div
              className={`${EYE_CLASSNAME} `}
              style={{
                width: `${eyes.left.size}rem`,
                height: `${eyes.left.size}rem`,
                left: `${eyes.left.left}rem`,
                top: `${eyes.left.top}rem`,
                backgroundColor: eyeColor,
                transition: "scale ease 100ms",
              }}
            />
            <div
              className={EYE_CLASSNAME}
              style={{
                width: `${eyes.right.size}rem`,
                height: `${eyes.right.size}rem`,
                right: `${eyes.right.right}rem`,
                top: `${eyes.right.top}rem`,
                backgroundColor: eyeColor,
                transition: "scale ease 100ms",
              }}
            />
          </div>
          <div
            className={MOUTH_CLASSNAME}
            style={{
              width: `${mouth.size.width}rem`,
              height: `${mouth.size.height}rem`,
              backgroundColor: eyeColor,
              bottom: `${mouth.bottom}%`,
              left: `${mouth.left}%`,
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const getDustySize = (size: number) => {
  const ratio = size / 10;
  return {
    faceSize: ratio,
    eyes: {
      scale: 1,
      left: {
        size: ratio * 0.2,
        left: ratio * 0.2,
        top: ratio * 0.3,
      },
      right: {
        size: ratio * 0.2,
        right: ratio * 0.2,
        top: ratio * 0.3,
      },
    },
    mouth: {
      size: {
        width: ratio * 0.3,
        height: ratio * 0.1,
      },
      left: 50,
      bottom: 30,
    },
    totalScale: 1,
    eyeScale: 1,
    mouthScale: 1,
    betweenEyes: ratio * 0.2,
    betweenEyeAndMouth: ratio * 0.1,
    betweenNameAndFace: ratio * 0.1,
  };
};

const getDustyRadius = (ie: number) => {
  return `${ie / 2}%`;
};

const getBackgroundColor = (mbti: MBTI) => {
  const { ns, ft, pj } = mbti;
  const r = Math.floor((ns / 100) * 255);
  const g = Math.floor((ft / 100) * 255);
  const b = Math.floor((pj / 100) * 255);
  return `rgb(${r},${g},${b})`;
};

const FACE_CLASSNAME = "ralative w-full h-full";
const EYE_CLASSNAME = "absolute rounded-full";
const MOUTH_CLASSNAME = "absolute rounded-full";
