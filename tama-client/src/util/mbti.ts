import { MBTI } from "@/types/status.type";

export const getFaceColor = (mbti: MBTI) => {
  const { ns, ft, pj } = mbti;
  const r = Math.floor((ns / 100) * 255);
  const g = Math.floor((ft / 100) * 255);
  const b = Math.floor((pj / 100) * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

export const getEyeColor = (rgbStr: string) => {
  // RGB 값 추출을 위해 괄호와 공백을 제거합니다.
  const rgb = rgbStr.replace(/[^\d,]/g, "").split(",");

  // RGB 값을 정수로 변환합니다.
  const red = parseInt(rgb[0], 10);
  const green = parseInt(rgb[1], 10);
  const blue = parseInt(rgb[2], 10);

  // 밝기 계산에 사용할 상수 값을 정의합니다.
  const brightnessThreshold = 130;

  // RGB 색상의 밝기를 계산합니다.
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  // 밝기가 임계값보다 작으면 폰트는 흰색, 그렇지 않으면 검은색을 반환합니다.
  return brightness < brightnessThreshold ? "#FFFFFF" : "#000000";
};
