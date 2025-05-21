// import Image from "next/image";

import styles from "./page.module.css";
import Form from "./form";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroImageContainer}>
          {/* <Image src="/placeholder-circles.svg" alt="Decorative circles" width={200} height={400} /> */}
        </div>
        <div className={styles.heroContent}>
          <h1>Get An Assessment Of Your Immigration Case</h1>
        </div>
      </section>
      <Form />
    </main>
  );
}
