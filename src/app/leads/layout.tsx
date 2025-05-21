import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./layout.module.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
