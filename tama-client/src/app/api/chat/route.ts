import axios from "axios";

export async function GET(req: Request) {
  return new Response("test");
}

export async function POST(req: Request) {
  const body = await req.json();

  // papago
  // const result = await axios
  //   .post("http://localhost:4000/translate", body)
  //   .then((res) => res.data)
  //   .catch(console.error);

  const result = await axios
    .post("http://localhost:4000/chat", body)
    .then((res) => res.data.data?.resText)
    .catch(console.error);

  return new Response(result);
}
