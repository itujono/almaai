"use client";

import Table from "@/components/table/table";
import { useState, useEffect } from "react";
import { Lead } from "@/actions/leads";
import { AlertDialog, AlertDialogContent, AlertDialogCancel } from "@/components/alert-dialog";
import { SearchIcon } from "lucide-react";
import Input from "@/components/input/base";
import Select from "@/components/select/base";
import styles from "./leads.module.css";
import { useQueryState } from "nuqs";
import Button from "@/components/button";

const ITEMS_PER_PAGE = 5;

const leadHeaders = [
  { key: "name", label: "Name", sortable: true },
  { key: "submitted", label: "Submitted", sortable: false },
  { key: "status", label: "Status", sortable: true },
  { key: "country", label: "Country", sortable: true },
];

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "reached_out", label: "Reached Out" },
  { value: "closed", label: "Closed" },
];

interface LeadsFormData {
  leads: Lead[];
}

export default function LeadsContent({ leads: initialLeads }: LeadsFormData) {
  const [searchValue, setSearchValue] = useQueryState("search", { defaultValue: "", history: "replace" });
  const [statusValue, setStatusValue] = useQueryState("status", { defaultValue: "", history: "replace" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    updateFilters(searchValue, statusValue);
  }, [searchValue, statusValue]);

  const updateFilters = async (search: string, status: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/leads?search=${search}&status=${status}`);
      if (!response.ok) throw new Error("Failed to fetch leads");
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setError("Failed to fetch leads. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (lead: Lead, newStatus: string) => {
    try {
      setError(null);
      const url = `/api/leads/${lead.id}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Failed to update lead status: ${response.status} ${responseText}`);
      }

      setLeads((currentLeads) => currentLeads.map((l) => (l.id === lead.id ? { ...l, status: newStatus } : l)));
      updateFilters(searchValue, statusValue);
    } catch (error) {
      console.error("Error updating lead status:", error);
      setError("Failed to update lead status. Please try again.");
    }
  };

  const handleOpenDialog = (lead: Lead) => {
    setSelectedLead(lead);
    setSelectedStatus(lead.status);
    setOpenStatusDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenStatusDialog(false);
    setSelectedLead(null);
    setSelectedStatus("");
  };

  return (
    <>
      <div className={styles.controlsContainer}>
        <Input
          placeholder="Search by name or country"
          aria-label="Search leads"
          leading={<SearchIcon size={18} />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSearchValue("");
            }
          }}
        />
        <Select
          placeholder="Status"
          options={statusOptions}
          aria-label="Filter by status"
          value={statusValue}
          onValueChange={(value: unknown) => setStatusValue(value as string)}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={isLoading ? styles.loading : ""}>
        <Table
          headers={leadHeaders}
          data={leads}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          actions={(lead) => (
            <Button size="small" onClick={() => handleOpenDialog(lead)}>
              Update...
            </Button>
          )}
        />
      </div>
      <AlertDialog
        title={`Update status for ${selectedLead?.name ?? ""}`}
        description="Select a new status for this lead."
        open={openStatusDialog}
        onOpenChange={handleCloseDialog}
      >
        <div className={styles.dialogContent}>
          <Select
            placeholder="Select status"
            options={statusOptions}
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value as string)}
          />
          <AlertDialogContent>
            <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
            <Button
              onClick={() => {
                if (selectedLead && selectedStatus) {
                  handleUpdateStatus(selectedLead, selectedStatus);
                  handleCloseDialog();
                }
              }}
            >
              Update Status
            </Button>
          </AlertDialogContent>
        </div>
      </AlertDialog>
    </>
  );
}
