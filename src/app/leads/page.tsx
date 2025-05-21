"use client";

import React, { useState } from "react";
import Table, { TableRow } from "@/components/table/table";
import Input from "@/components/input";
import Select from "@/components/select";
import AlertDialog from "@/components/alert-dialog";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import styles from "./leads.module.css";

const ITEMS_PER_PAGE = 5;

const leadHeaders = [
  { key: "name", label: "Name", sortable: true },
  { key: "submitted", label: "Submitted", sortable: false },
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
  { id: "9", name: "Luis Carlos", submitted: "02/03/2024, 10:00 AM", status: "Pending", country: "Colombia" },
  { id: "10", name: "Aisha Khan", submitted: "02/03/2024, 11:30 AM", status: "Reached Out", country: "Pakistan" },
  { id: "11", name: "Kenji Tanaka", submitted: "02/03/2024, 1:15 PM", status: "Closed", country: "Japan" },
];

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "reached_out", label: "Reached Out" },
  { value: "closed", label: "Closed" },
];

export default function Leads() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [selectedStatus, setSelectedStatus] = useState('');

  const totalPages = Math.ceil(mockLeadsData.length / ITEMS_PER_PAGE);

  const handleUpdateStatus = (lead: TableRow) => {
    console.log(`Confirmed update for lead: ${lead.name}`);
  };

  const renderActions = (lead: TableRow) => (
    <AlertDialog
      triggerText="Update..."
      title={`Update status for ${lead.name}`}
      description={`Are you sure you want to update the status for ${lead.name}? This action cannot be undone.`}
      okText="Confirm Update"
      closeText="Cancel"
      onOk={() => handleUpdateStatus(lead)}
    />
  );

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= halfMaxPages) {
        endPage = maxPagesToShow;
      } else if (currentPage + halfMaxPages >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={currentPage === i}
          className={`${styles.pageNumber} ${currentPage === i ? styles.activePage : ""}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.leadsPageLayout}>
      <div className={styles.leadsContentPanel}>
        <h1 className={styles.title}>Leads</h1>
        <div className={styles.controlsContainer}>
          <Input name="searchLeads" placeholder="Search" aria-label="Search leads" />
          <Select name="statusFilter" placeholder="Status" options={statusOptions} aria-label="Filter by status" />
        </div>
        <Table
          headers={leadHeaders}
          data={mockLeadsData}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          actions={renderActions}
        />
        <div className={styles.paginationControls}>
          <button
            onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={styles.paginationNavButton}
            aria-label="Previous page"
          >
            <ChevronLeftIcon size={18} />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={styles.paginationNavButton}
            aria-label="Next page"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
