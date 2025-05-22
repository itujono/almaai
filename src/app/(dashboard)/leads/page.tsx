import styles from "./leads.module.css";
import { getLeads } from "@/actions/leads";
import LeadsContent from "./content";
import { Suspense } from "react";

export default async function Leads() {
  const leads = await getLeads();

  return (
    <div className={styles.leadsPageLayout}>
      <div className={styles.leadsContentPanel}>
        <h1 className={styles.title}>Leads</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <LeadsContent leads={leads} />
        </Suspense>
      </div>
    </div>
  );
}
