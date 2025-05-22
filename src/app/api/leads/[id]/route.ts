import { NextRequest, NextResponse } from "next/server";
import { updateLeadStatus } from "@/actions/leads";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const validStatuses = ["pending", "reached_out", "closed"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const lead = await updateLeadStatus(id, status);
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 });
  }
}
