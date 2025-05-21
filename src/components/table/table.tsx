import React, { useState, useMemo } from "react";
import styles from "./table.module.css";
import { ArrowDownIcon } from "lucide-react";
import Pagination from "./pagination";

interface TableHeader {
  key: string;
  label: string;
  sortable?: boolean;
}

type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
} | null;

interface TableProps<T extends Record<string, any>> {
  headers: TableHeader[];
  data: T[];
  caption?: string;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  actions?: (item: T) => React.ReactNode;
}

const Table = <T extends Record<string, any>>({
  headers,
  data,
  caption,
  itemsPerPage,
  currentPage = 1,
  onPageChange,
  actions,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const processedData = useMemo(() => {
    let processedItems = [...data];

    if (sortConfig !== null) {
      processedItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    if (itemsPerPage && currentPage) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      processedItems = processedItems.slice(startIndex, endIndex);
    }

    return processedItems;
  }, [data, sortConfig, currentPage, itemsPerPage]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: string) => {
    const isSortedByKey = sortConfig !== null && sortConfig.key === key;
    const isAscending = isSortedByKey && sortConfig!.direction === "ascending";
    return <ArrowDownIcon className={`${styles.sortIcon} ${isAscending ? styles.rotatedIcon : ""}`} />;
  };

  const totalPages = itemsPerPage ? Math.ceil(data.length / itemsPerPage) : 1;

  return (
    <>
      <div className={styles.tableContainer}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              {headers.map((header) => (
                <th
                  key={header.key}
                  onClick={header.sortable ? () => requestSort(header.key) : undefined}
                  className={`${header.sortable ? styles.sortable : ""} ${styles.th}`}
                >
                  <div className={`${styles.headerContent} ${styles.sortIndicator}`}>
                    {header.label}
                    {header.sortable && getSortIndicator(header.key)}
                  </div>
                </th>
              ))}
              {actions && <th className={`${styles.actionsHeader} ${styles.th}`}>Actions</th>}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {processedData.map((item, index) => (
              <tr key={index} className={styles.tr}>
                {headers.map((header) => (
                  <td key={header.key} className={styles.td}>
                    {item[header.key]}
                  </td>
                ))}
                {actions && <td className={`${styles.actionsCell} ${styles.td}`}>{actions(item)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {itemsPerPage && onPageChange && (
        <div className={styles.paginationWrapper}>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </>
  );
};

export default Table;
