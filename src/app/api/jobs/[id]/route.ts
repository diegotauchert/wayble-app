import { jobs } from "@/data/jobs";

export function GET(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop());
  const job = jobs.find((job) => job.id === id);
  return new Response(JSON.stringify(job), { status: 200 });
}
