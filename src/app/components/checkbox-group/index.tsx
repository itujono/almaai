import { CheckboxGroup as CheckboxGroupBase } from "@base-ui-components/react/checkbox-group";
import Checkbox from "../checkbox";
import styles from "./checkbox-group.module.css";
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
    <CheckboxGroupBase className={styles.CheckboxGroup} {...props}>
      {items.map((item) => (
        <Checkbox key={item.value} label={item.label} value={item.value} />
      ))}
    </CheckboxGroupBase>
  );
}
