import { searchInternships } from "@/lib/internships";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const results = searchInternships(params);

  return Response.json({ internships: results, total: results.length });
}