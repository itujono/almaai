import * as React from "react";
import { Field } from "@base-ui-components/react/field";
import styles from "./textarea.module.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

export default function Textarea({ name, label, ...props }: TextareaProps) {
  return (
    <Field.Root name={name} className={styles.field}>
      {label && <Field.Label className={styles.label}>{label}</Field.Label>}
      <textarea className={styles.textarea} {...props} />
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
