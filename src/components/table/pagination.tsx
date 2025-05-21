import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import styles from "./table.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
}

export default function Pagination({ currentPage, totalPages, onPageChange, maxPagesToShow = 3 }: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
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
          onClick={() => onPageChange(i)}
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
    <div className={styles.paginationControls}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={styles.paginationNavButton}
        aria-label="Previous page"
      >
        <ChevronLeftIcon size={18} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={styles.paginationNavButton}
        aria-label="Next page"
      >
        <ChevronRightIcon size={18} />
      </button>
    </div>
  );
}
