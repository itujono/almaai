import { CheckboxGroup as CheckboxGroupBase } from "@base-ui-components/react/checkbox-group";
import Checkbox from "../checkbox";
import styles from "./checkbox-group.module.css";
import { Field } from "@base-ui-components/react/field";

interface Item {
  value: string;
  label: string;
}

export interface CheckboxGroupProps extends React.ComponentProps<typeof CheckboxGroupBase> {
  label?: string;
  items: Item[];
  error?: string;
}

export default function CheckboxGroup({ label, items, error, ...props }: CheckboxGroupProps) {
  return (
    <div className={styles.field}>
      {label && <Field.Label className={styles.label}>{label}</Field.Label>}
      <CheckboxGroupBase className={styles.CheckboxGroup} {...props}>
        {items.map((item) => (
          <Checkbox key={item.value} label={item.label} value={item.value} />
        ))}
      </CheckboxGroupBase>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
