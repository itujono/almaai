import Button from "./components/button";
import CheckboxGroup from "./components/checkbox-group";
import Input from "./components/input";
import Logo from "./components/logo";
import Select from "./components/select";
import Textarea from "./components/textarea";
import styles from "./page.module.css";
import Image from "next/image";

const visaCategories = [
  { value: "o1", label: "O-1" },
  { value: "eb1a", label: "EB-1A" },
  { value: "eb2niw", label: "EB-2 NIW" },
  { value: "unknown", label: "I don't know" },
];

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "other", label: "Other" },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroImageContainer}>
          <Image src="/placeholder-circles.svg" alt="Decorative circles" width={200} height={400} />
        </div>
        <div className={styles.heroContent}>
          <Logo width={80} height={25} />
          <h1>Get An Assessment Of Your Immigration Case</h1>
        </div>
      </section>

      <div className={styles.formContainer}>
        <section className={styles.formSection}>
          <SectionHeader
            icon="📄"
            title="Want to understand your visa options?"
            description="Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your
case based on your goals."
          />
          <div className={styles.innerSection}>
            <Input name="firstName" placeholder="First Name" aria-label="First Name" />
            <Input name="lastName" placeholder="Last Name" aria-label="Last Name" />
            <Input type="email" name="email" placeholder="Email" aria-label="Email" />
            <Select
              name="country"
              placeholder="Country of Citizenship"
              aria-label="Country of Citizenship"
              options={countries}
            />
            <Input
              name="website"
              placeholder="LinkedIn / Personal Website URL"
              aria-label="LinkedIn or Personal Website URL"
            />
          </div>
        </section>

        <section className={styles.formSection}>
          <SectionHeader icon="🎲" title="Visa categories of interest?" />
          <div className={styles.innerSection}>
            <CheckboxGroup label="Select applicable visa categories" items={visaCategories} />
          </div>
        </section>

        <section className={styles.formSection}>
          <SectionHeader icon="💜" title="How can we help you?" />
          <div className={styles.innerSection}>
            <Textarea
              name="helpDetails"
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
              aria-label="How can we help you?"
              rows={6}
            />
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.innerSection}>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

interface SectionHeaderProps {
  icon: string;
  title: string;
  description?: string;
}

function SectionHeader({ icon, title, description }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <span>{icon}</span>
      <h4>{title}</h4>
      {description && <p>{description}</p>}
    </div>
  );
}
