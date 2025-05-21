"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import Logo from "../logo";

const UserAvatar = ({ initials }: { initials: string }) => <div className={styles.avatar}>{initials}</div>;

const menuItems = [
  {
    label: "Leads",
    href: "/leads",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <Logo width={100} />
        <nav className={styles.nav}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={`${styles.navLink} ${pathname === item.href ? styles.active : ""}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.sidebarBottom}>
        <UserAvatar initials="A" />
        <span className={styles.adminName}>Admin</span>
      </div>
    </aside>
  );
}
