import type { ComponentProps } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
}

export default function Button({ variant = "primary", ...props }: ButtonProps) {
  const buttonClasses = `${styles.button} ${variant === "secondary" ? styles.secondary : styles.primary}`;
  return <button className={buttonClasses} {...props} />;
}
