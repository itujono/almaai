import * as React from "react";
import { Field } from "@base-ui-components/react/field";
import styles from "./textarea.module.css";
import type { Control, FieldValues, Path } from "react-hook-form";
import FormField from "../form/form-field";

interface TextareaProps<T extends FieldValues> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
}

export default function Textarea<T extends FieldValues>({ name, label, control, ...props }: TextareaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && <Field.Label className={styles.label}>{label}</Field.Label>}
          <textarea className={styles.textarea} {...props} {...field} />
          {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
