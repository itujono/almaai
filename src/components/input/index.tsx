import { Input as InputBase } from "@base-ui-components/react/input";
import styles from "./input.module.css";
import { Field } from "@base-ui-components/react/field";
import type { Control, FieldValues, Path } from "react-hook-form";
import React from "react";
import FormField from "../form/form-field";

interface InputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "prefix"> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export default function Input<T extends FieldValues>({
  name,
  label,
  control,
  leading,
  trailing,
  className,
  ...props
}: InputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          {label && <Field.Label className={styles.label}>{label}</Field.Label>}
          <div className={styles.inputWrapper}>
            {leading && <div className={styles.leading}>{leading}</div>}
            <InputBase
              className={`${styles.input} ${leading ? styles.hasLeading : ""} ${trailing ? styles.hasTrailing : ""} ${
                className || ""
              }`}
              {...props}
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              ref={field.ref}
              value={field.value ?? ""}
            />
            {trailing && <div className={styles.trailing}>{trailing}</div>}
          </div>
          {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
