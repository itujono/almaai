import { CheckboxGroup as CheckboxGroupBase } from "@base-ui-components/react/checkbox-group";
import styles from "./checkbox-group.module.css";
import Checkbox from "../checkbox";

interface Item {
  value: string;
  label: string;
}

type CheckboxGroupProps = React.ComponentProps<typeof CheckboxGroupBase> & {
  label: string;
  items: Item[];
};

export default function CheckboxGroup({ label, items, ...props }: CheckboxGroupProps) {
  return (
    <CheckboxGroupBase className={styles.checkboxGroup} {...props}>
      {items.map((item) => (
        <Checkbox key={item.value} label={item.label} value={item.value} />
      ))}
    </CheckboxGroupBase>
  );
}
