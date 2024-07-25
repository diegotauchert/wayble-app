import { users } from "@/data/users";

export function GET() {
  return new Response(JSON.stringify(users), { status: 200 });
}
