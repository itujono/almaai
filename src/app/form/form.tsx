"use client";

import Button from "@/components/button";
import Textarea from "@/components/textarea";
import Input from "@/components/input";
import Select from "@/components/select";
import CheckboxGroup from "@/components/checkbox-group";
import { useState } from "react";
import styles from "./page.module.css";
import formStyles from "./form.module.css";
import Dialog from "@/components/dialog";

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

export default function Form() {
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Add actual form submission logic here
    console.log("Form submitted");
    setIsThankYouOpen(true);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.formContainer}>
      <ThankYouDialog isThankYouOpen={isThankYouOpen} setIsThankYouOpen={setIsThankYouOpen} />
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
    </form>
  );
}

interface ThankYouDialogProps {
  isThankYouOpen: boolean;
  setIsThankYouOpen: (isOpen: boolean) => void;
}

function ThankYouDialog({ isThankYouOpen, setIsThankYouOpen }: ThankYouDialogProps) {
  return (
    <Dialog.Root open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
      <Dialog.Content closeButton={null}>
        <div className={formStyles.Content}>
          <section>
            <span role="img" aria-label="Thank You">
              📄
            </span>
            <h3>Thank You</h3>
            <p>
              Your information was submitted to our team of immigration attorneys. Expect an email from
              hello@tryalma.ai.
            </p>
          </section>
          <Button type="button" variant="primary" onClick={() => setIsThankYouOpen(false)}>
            Go Back to Homepage
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

interface SectionHeaderProps {
  icon: string; // TODO: Make this an icon component
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
