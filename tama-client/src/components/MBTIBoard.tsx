import StatusGauge from "./ui/StatusGauge";
import { getMBTI } from "@/util/mbti";
import { MBTI } from "@/types/dusty.type";

interface MBTIBoardProps {
  mbti: MBTI;
}

export default function MBTIBoard({ mbti }: MBTIBoardProps) {
  const { ie, ns, ft, pj } = mbti;

  return (
    <div className="bg-white w-full flex flex-col items-center gap-2 p-4 rounded-md">
      <p className="text-lg text-neutral-600">{getMBTI(mbti)}</p>
      <StatusGauge data={ie} color="black" textLeft="I" textRight="E" />
      <StatusGauge data={ns} color="red" textLeft="N" textRight="S" />
      <StatusGauge data={ft} color="green" textLeft="F" textRight="T" />
      <StatusGauge data={pj} color="blue" textLeft="P" textRight="J" />
    </div>
  );
}
