import { Pet } from "@/types/pet.type";

export default async function Home() {
  const [{ name, growthStage }] = (await fetch(
    "http://localhost:3000/pet"
  ).then((res) => res.json())) as Pet[];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="text:bold">{name}</p>
      <p className="text:bold">{growthStage}</p>
    </main>
  );
}
