"use client";

import { Input as InputBase } from "@base-ui-components/react/input";
import styles from "./input.module.css";
import { Field } from "@base-ui-components/react/field";
import React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  error?: string;
}

export default function Input({ label, leading, trailing, className, error, ...props }: InputProps) {
  return (
    <div className={styles.field}>
      {label && <Field.Label className={styles.label}>{label}</Field.Label>}
      <div className={styles.inputWrapper}>
        {leading && <div className={styles.leading}>{leading}</div>}
        <InputBase
          className={`${styles.input} ${leading ? styles.hasLeading : ""} ${trailing ? styles.hasTrailing : ""} ${
            className || ""
          }`}
          {...props}
        />
        {trailing && <div className={styles.trailing}>{trailing}</div>}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
