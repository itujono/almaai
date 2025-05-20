import { HTMLAttributes } from "react";
import styles from "./button.module.css";

export default function Button(props: HTMLAttributes<HTMLButtonElement>) {
  return <button className={styles.button} {...props} />;
}
