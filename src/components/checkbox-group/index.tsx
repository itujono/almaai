import { CheckboxGroup as CheckboxGroupBase } from "@base-ui-components/react/checkbox-group";
import Checkbox from "../checkbox";
import styles from "./checkbox-group.module.css";
import { Field } from "@base-ui-components/react/field";
interface Item {
  value: string;
  label: string;
}

type CheckboxGroupProps = React.ComponentProps<typeof CheckboxGroupBase> & {
  label?: string;
  items: Item[];
  name: string;
};

export default function CheckboxGroup({ name, label, items, ...props }: CheckboxGroupProps) {
  return (
    <Field.Root name={name} className={styles.field}>
      <Field.Label className={styles.label}>{label}</Field.Label>
      <CheckboxGroupBase className={styles.CheckboxGroup} {...props}>
        {items.map((item) => (
          <Checkbox key={item.value} label={item.label} value={item.value} />
        ))}
      </CheckboxGroupBase>
      <Field.Error className={styles.error} />
    </Field.Root>
  );
}
