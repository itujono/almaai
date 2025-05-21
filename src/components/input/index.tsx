import { Input as InputBase } from "@base-ui-components/react/input";
import styles from "./input.module.css";
import { Field } from "@base-ui-components/react/field";
import { Control, Controller, ControllerProps, FieldPath } from "react-hook-form";
import { Path } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import React from "react";
import FormField from "../form/form-field";
interface InputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "prefix"> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  description?: string;
}

export default function Input<T extends FieldValues>({ name, label, control, ...props }: InputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && <Field.Label className={styles.label}>{label}</Field.Label>}
          <InputBase className={styles.input} {...props} {...field} />
          {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
