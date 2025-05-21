import { Checkbox as CheckboxBase } from "@base-ui-components/react/checkbox";
import styles from "./checkbox.module.css";
import { CheckIcon } from "lucide-react";

type CheckboxProps = React.ComponentProps<typeof CheckboxBase.Root> & {
  label?: string;
  value?: string;
};

export default function Checkbox({ label, value, ...props }: CheckboxProps) {
  const renderCheckbox = () => (
    <CheckboxBase.Root className={styles.checkbox} value={value} {...props}>
      <CheckboxBase.Indicator className={styles.indicator}>
        <CheckIcon className={styles.icon} />
      </CheckboxBase.Indicator>
    </CheckboxBase.Root>
  );

  return label ? (
    <label className={styles.label}>
      {renderCheckbox()}
      <span>{label}</span>
    </label>
  ) : (
    renderCheckbox()
  );
}
