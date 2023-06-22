interface StatusGaueProps {
  data: number;
  color: string;
  textLeft: string;
  textRight: string;
}

export default function StatusGauge({
  data,
  color,
  textLeft,
  textRight,
}: StatusGaueProps) {
  return (
    <div className="flex items-center w-full">
      <p className="flex-1 text-center">{textLeft}</p>
      <div className="relative flex-[8_2_0%] bg-gray-200 h-[20px] flex rounded-full overflow-hidden">
        <div
          style={{
            width: `${data}%`,
            height: "100%",
            backgroundColor: color,
            transition: "width ease 0.5s",
          }}
        />
        <div className="absolute top-0 left-[50%] w-[1px] h-[100%] bg-black" />
      </div>
      <p className="flex-1 text-center">{textRight}</p>
    </div>
  );
}
