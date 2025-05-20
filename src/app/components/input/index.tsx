import { Input as InputBase } from "@base-ui-components/react/input";
import styles from "./input.module.css";
import { Field } from "@base-ui-components/react/field";

interface InputProps extends React.ComponentProps<typeof InputBase> {
  label?: string;
}

export default function Input({ name, label, ...props }: InputProps) {
  return (
    <Field.Root name={name} className={styles.field}>
      {label && <Field.Label className={styles.label}>{label}</Field.Label>}
      <InputBase className={styles.input} {...props} />
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
