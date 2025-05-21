"use server";

export interface Lead {
  id: string;
  name: string;
  submitted: string;
  status: string;
  country: string;
}

const mockLeadsData: Lead[] = [
  { id: "1", name: "Jorge Ruiz", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Mexico" },
  { id: "2", name: "Bahar Zamir", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Mexico" },
  { id: "3", name: "Mary Lopez", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Brazil" },
  { id: "4", name: "Li Zijin", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "South Korea" },
  { id: "5", name: "Mark Antonov", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Russia" },
  { id: "6", name: "Jane Ma", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Mexico" },
  { id: "7", name: "Anand Jain", submitted: "02/02/2024, 2:45 PM", status: "Reached Out", country: "Mexico" },
  { id: "8", name: "Anna Voronova", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "France" },
  { id: "9", name: "Luis Carlos", submitted: "02/03/2024, 10:00 AM", status: "Pending", country: "Colombia" },
  { id: "10", name: "Aisha Khan", submitted: "02/03/2024, 11:30 AM", status: "Reached Out", country: "Pakistan" },
  { id: "11", name: "Kenji Tanaka", submitted: "02/03/2024, 1:15 PM", status: "Closed", country: "Japan" },
];

export async function getLeads(search?: string, status?: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredLeads = [...mockLeadsData];

  if (search) {
    const searchLower = search.toLowerCase();
    filteredLeads = filteredLeads.filter(
      (lead) => lead.name.toLowerCase().includes(searchLower) || lead.country.toLowerCase().includes(searchLower),
    );
  }

  if (status) {
    filteredLeads = filteredLeads.filter((lead) => lead.status.toLowerCase() === status.toLowerCase());
  }

  return filteredLeads;
}
