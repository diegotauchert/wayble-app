import { jobs } from "@/data/jobs";

export function GET() {
  return new Response(JSON.stringify(jobs), { status: 200 });
}
