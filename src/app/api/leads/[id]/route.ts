import { NextResponse } from "next/server";
import { updateLeadStatus } from "@/actions/leads";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const validStatuses = ["pending", "reached_out", "closed"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const lead = await updateLeadStatus(params.id, status);
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 });
  }
}
