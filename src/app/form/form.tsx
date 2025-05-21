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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  website: z.string().min(1, "LinkedIn or Personal Website URL is required").url("Invalid URL"),
  visaCategories: z.array(z.string()).min(1, "At least one visa category is required"),
  helpDetails: z.string().min(1, "Help details are required"),
});

export default function LeadForm() {
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setIsThankYouOpen(true);
  };

  return (
    <form className={styles.formContainer} onSubmit={form.handleSubmit(onSubmit)}>
      <ThankYouDialog isThankYouOpen={isThankYouOpen} setIsThankYouOpen={setIsThankYouOpen} />
      <section className={styles.formSection}>
        <SectionHeader
          icon="📄"
          title="Want to understand your visa options?"
          description="Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your
case based on your goals."
        />
        <div className={styles.innerSection}>
          <Input name="firstName" placeholder="First Name" aria-label="First Name" control={form.control} />
          <Input name="lastName" placeholder="Last Name" aria-label="Last Name" control={form.control} />
          <Input type="email" name="email" placeholder="Email" aria-label="Email" control={form.control} />
          <Select
            name="country"
            placeholder="Country of Citizenship"
            aria-label="Country of Citizenship"
            options={countries}
            control={form.control}
          />
          <Input
            name="website"
            placeholder="LinkedIn / Personal Website URL"
            aria-label="LinkedIn or Personal Website URL"
            control={form.control}
          />
        </div>
      </section>

      <section className={styles.formSection}>
        <SectionHeader icon="🎲" title="Visa categories of interest?" />
        <div className={styles.innerSection}>
          <CheckboxGroup name="visaCategories" items={visaCategories} />
        </div>
      </section>

      <section className={styles.formSection}>
        <SectionHeader icon="💜" title="How can we help you?" />
        <div className={styles.innerSection}>
          <Textarea
            control={form.control}
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
