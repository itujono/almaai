import { getLeads } from "@/actions/leads";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;

  const leads = await getLeads(search, status);
  return NextResponse.json(leads);
}
