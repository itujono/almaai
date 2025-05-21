import styles from "./leads.module.css";
import { getLeads } from "@/actions/leads";
import LeadsContent from "./content";

export default async function Leads() {
  const leads = await getLeads();

  return (
    <div className={styles.leadsPageLayout}>
      <div className={styles.leadsContentPanel}>
        <h1 className={styles.title}>Leads</h1>
        <LeadsContent leads={leads} />
      </div>
    </div>
  );
}
