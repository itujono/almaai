import React, { useState, useMemo } from "react";
import styles from "./table.module.css";
import { ArrowDownIcon } from "lucide-react";

interface TableHeader {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableRow {
  id: string; // Or a unique key for the row
  [key: string]: any;
}

// Define a type for sort configuration
type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
} | null;

interface TableProps {
  headers: TableHeader[];
  data: TableRow[];
  caption?: string;
  itemsPerPage?: number;
  currentPage?: number;
  actions?: (item: TableRow) => React.ReactNode; // Function to render actions for a row
}

const Table: React.FC<TableProps> = ({ headers, data, caption, itemsPerPage, currentPage, actions }) => {
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

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {headers.map((header) => (
              <th
                key={header.key}
                className={`${styles.th} ${header.sortable ? styles.sortableHeader : ""}`}
                onClick={() => header.sortable && requestSort(header.key)}
                scope="col"
              >
                {header.label}
                {header.sortable && (
                  <span className={styles.sortIndicatorContainer}>{getSortIndicator(header.key)}</span>
                )}
              </th>
            ))}
            {actions && (
              <th scope="col" className={styles.th}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {processedData.map((item) => (
            <tr key={item.id} className={styles.tr}>
              {headers.map((header) => (
                <td key={header.key} className={styles.td} data-label={header.label}>
                  {item[header.key]}
                </td>
              ))}
              {actions && <td className={`${styles.td} ${styles.actionsCell}`}>{actions(item)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
