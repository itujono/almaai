import styles from "./page.module.css";
import Form from "./form";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroImageContainer}></div>
        <div className={styles.heroContent}>
          <Logo />
          <h1>Get An Assessment Of Your Immigration Case</h1>
        </div>
      </section>
      <Form />
    </main>
  );
}
