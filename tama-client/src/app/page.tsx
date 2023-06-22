import MBTIBoard from "@/components/MBTIBoard";
import Feild from "@/components/Feild";
import { DUSTTY_DATA } from "@/data/dustyData";
import ChatInput from "@/components/ui/ChatInput";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-4 bg-[#281a4b]">
      <div className="w-full">
        <section className="w-full">
          <Feild />
        </section>
      </div>
      <div className="w-full">
        <section className="w-full flex flex-col gap-4">
          <ChatInput name={DUSTTY_DATA.name} />
          <MBTIBoard mbti={DUSTTY_DATA.mbti} />
        </section>
      </div>
    </main>
  );
}
