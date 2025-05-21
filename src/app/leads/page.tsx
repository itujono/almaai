"use client";

import React, { useState } from "react";
import Table, { TableRow } from "@/components/table/table";
import Input from "@/components/input";
import Select from "@/components/select";
import AlertDialog from "@/components/alert-dialog";
import styles from "./leads.module.css";

const ITEMS_PER_PAGE = 5;

const leadHeaders = [
  { key: "name", label: "Name", sortable: true },
  { key: "submitted", label: "Submitted", sortable: false }, // Or implement date parsing for sorting
  { key: "status", label: "Status", sortable: true },
  { key: "country", label: "Country", sortable: true },
];

const mockLeadsData = [
  { id: "1", name: "Jorge Ruiz", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Mexico" },
  { id: "2", name: "Bahar Zamir", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Mexico" },
  { id: "3", name: "Mary Lopez", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Brazil" },
  { id: "4", name: "Li Zijin", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "South Korea" },
  { id: "5", name: "Mark Antonov", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Russia" },
  { id: "6", name: "Jane Ma", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "Mexico" },
  { id: "7", name: "Anand Jain", submitted: "02/02/2024, 2:45 PM", status: "Reached Out", country: "Mexico" },
  { id: "8", name: "Anna Voronova", submitted: "02/02/2024, 2:45 PM", status: "Pending", country: "France" },
];

const statusOptions = [
  // Options for the select dropdown
  { value: "pending", label: "Pending" },
  { value: "reached_out", label: "Reached Out" },
  { value: "closed", label: "Closed" }, // Example, add as needed
];

export default function Leads() {
  const [currentPage, setCurrentPage] = React.useState(1);
  // const [searchTerm, setSearchTerm] = React.useState('');
  // const [selectedStatus, setSelectedStatus] = React.useState('');
  // Add state for which lead is being updated, if needed for the dialog
  // const [updatingLead, setUpdatingLead] = React.useState<typeof mockLeadsData[0] | null>(null);

  const totalPages = Math.ceil(mockLeadsData.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleUpdateStatus = (lead: TableRow) => {
    // Logic to update lead status will go here
    // For now, just log it and the potential new status from the dialog
    console.log(`Confirmed update for lead: ${lead.name}`);
    // Example: setUpdatingLead(null); // Close dialog or reset state after confirmation
  };

  const renderActions = (lead: TableRow) => (
    <AlertDialog
      triggerText="Update..."
      title={`Update status for ${lead.name}`}
      description={`Are you sure you want to update the status for ${lead.name}? This action cannot be undone.`}
      okText="Confirm Update"
      closeText="Cancel"
      onOk={() => handleUpdateStatus(lead)}
    >
      <></>
    </AlertDialog>
  );

  return (
    <div className={styles.leadsPageLayout}>
      {" "}
      {/* Optional: for overall page background/spacing */}
      <div className={styles.leadsContentPanel}>
        <h1 className={styles.title}>Leads</h1>
        <div className={styles.controlsContainer}>
          <Input
            name="searchLeads"
            placeholder="Search" // Icon to be handled later if not part of Input component
            aria-label="Search leads"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)} // For controlled component
          />
          <Select
            name="statusFilter"
            placeholder="Status" // This will be the default text shown
            options={statusOptions}
            aria-label="Filter by status"
            // value={selectedStatus} // For controlled component
            // onValueChange={setSelectedStatus} // For controlled component
          />
        </div>
        <Table
          headers={leadHeaders}
          data={mockLeadsData}
          caption="Client Leads"
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          actions={renderActions}
        />
        <div className={styles.paginationControls}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
