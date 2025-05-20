import * as React from "react";
import { Select as SelectBase } from "@base-ui-components/react/select";
import { ChevronsUpDown, Check } from "lucide-react";
import styles from "./select.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.ComponentProps<typeof SelectBase.Root>, "children"> {
  name?: string;
  placeholder?: string;
  options: SelectOption[];
}

export default function Select({ name, placeholder, options, ...props }: SelectProps) {
  return (
    <SelectBase.Root {...props}>
      <SelectBase.Trigger className={styles.select}>
        <SelectBase.Value placeholder={placeholder} />
        <SelectBase.Icon className={styles.icon}>
          <ChevronsUpDown size={16} />
        </SelectBase.Icon>
      </SelectBase.Trigger>
      <SelectBase.Portal>
        <SelectBase.Positioner sideOffset={8}>
          <SelectBase.ScrollUpArrow className={styles.scrollArrow} />
          <SelectBase.Popup className={styles.popup}>
            {options.map((option) => (
              <SelectBase.Item className={styles.item} key={option.value} value={option.value}>
                <SelectBase.ItemIndicator className={styles.itemIndicator}>
                  <Check size={10} />
                </SelectBase.ItemIndicator>
                <SelectBase.ItemText className={styles.itemText}>{option.label}</SelectBase.ItemText>
              </SelectBase.Item>
            ))}
          </SelectBase.Popup>
          <SelectBase.ScrollDownArrow className={styles.scrollArrow} />
        </SelectBase.Positioner>
      </SelectBase.Portal>
    </SelectBase.Root>
  );
}
