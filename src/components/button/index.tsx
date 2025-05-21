import type { ComponentProps } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  size?: "medium" | "small";
}

export default function Button({ variant = "primary", size = "medium", ...props }: ButtonProps) {
  const buttonClasses = `${styles.button} ${variant === "secondary" ? styles.secondary : styles.primary} ${
    size === "small" ? styles.small : ""
  }`;
  return <button className={buttonClasses} {...props} />;
}
