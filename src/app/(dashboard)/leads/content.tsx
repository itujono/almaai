"use client";

import Table from "@/components/table/table";
import { useState, useEffect } from "react";
import { Lead } from "@/actions/leads";
import AlertDialog from "@/components/alert-dialog";
import { SearchIcon } from "lucide-react";
import Input from "@/components/input/base";
import Select from "@/components/select/base";
import styles from "./leads.module.css";
import { useQueryState } from "nuqs";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters(searchValue, statusValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    updateFilters(searchValue, statusValue);
  }, [statusValue]);

  const updateFilters = async (search: string, status: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/leads?search=${search}&status=${status}`);
      if (!response.ok) throw new Error("Failed to fetch leads");
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = (lead: Lead) => {
    console.log(`Confirmed update for lead: ${lead.name}`);
  };

  const renderActions = (lead: Lead) => (
    <AlertDialog
      triggerText="Update..."
      title={`Update status for ${lead.name}`}
      description={`Are you sure you want to update the status for ${lead.name}? This action cannot be undone.`}
      okText="Confirm Update"
      onOk={() => handleUpdateStatus(lead)}
    />
  );

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
      <Table
        headers={leadHeaders}
        data={leads}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        actions={renderActions}
      />
    </>
  );
}
