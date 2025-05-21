"use server";

export interface Lead {
  id: string;
  name: string;
  submitted: string;
  status: string;
  country: string;
}

const mockLeadsData: Lead[] = [
  { id: "1", name: "Jorge Ruiz", submitted: "02/02/2024, 2:45 PM", status: "pending", country: "Mexico" },
  { id: "2", name: "Bahar Zamir", submitted: "02/02/2024, 2:45 PM", status: "pending", country: "Mexico" },
  { id: "3", name: "Mary Lopez", submitted: "02/02/2024, 2:45 PM", status: "pending", country: "Brazil" },
  { id: "4", name: "Li Zijin", submitted: "02/02/2024, 2:45 PM", status: "pending", country: "South Korea" },
  { id: "5", name: "Mark Antonov", submitted: "02/02/2024, 2:45 PM", status: "pending", country: "Russia" },
  { id: "6", name: "Jane Ma", submitted: "02/02/2024, 2:45 PM", status: "pending", country: "Mexico" },
  { id: "7", name: "Anand Jain", submitted: "02/02/2024, 2:45 PM", status: "reached_out", country: "Mexico" },
  { id: "8", name: "Anna Voronova", submitted: "02/02/2024, 2:45 PM", status: "pending", country: "France" },
  { id: "9", name: "Luis Carlos", submitted: "02/03/2024, 10:00 AM", status: "pending", country: "Colombia" },
  { id: "10", name: "Aisha Khan", submitted: "02/03/2024, 11:30 AM", status: "reached_out", country: "Pakistan" },
  { id: "11", name: "Kenji Tanaka", submitted: "02/03/2024, 1:15 PM", status: "closed", country: "Japan" },
];

let leads = [...mockLeadsData];

export async function getLeads(search?: string, status?: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredLeads = [...leads];

  if (search) {
    const searchLower = search.toLowerCase();
    filteredLeads = filteredLeads.filter(
      (lead) => lead.name.toLowerCase().includes(searchLower) || lead.country.toLowerCase().includes(searchLower),
    );
  }

  if (status) {
    filteredLeads = filteredLeads.filter((lead) => lead.status === status);
  }

  return filteredLeads;
}

export async function updateLeadStatus(id: string, status: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const leadIndex = leads.findIndex((lead) => lead.id === id);
  if (leadIndex === -1) {
    throw new Error("Lead not found");
  }

  leads[leadIndex] = {
    ...leads[leadIndex],
    status: status.toLowerCase(),
  };

  return leads[leadIndex];
}
