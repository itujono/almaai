"use client";

import { Select as SelectBase } from "@base-ui-components/react/select";
import { Check, ChevronDown } from "lucide-react";
import styles from "./select.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.ComponentProps<typeof SelectBase.Root> {
  placeholder?: string;
  options: SelectOption[];
  error?: string;
}

export default function Select({ placeholder, options, error, value, onValueChange, ...props }: SelectProps) {
  return (
    <div className={styles.field}>
      <SelectBase.Root {...props} value={value} onValueChange={onValueChange}>
        <SelectBase.Trigger className={styles.select}>
          <SelectBase.Value placeholder={placeholder} />
          <SelectBase.Icon className={styles.icon}>
            <ChevronDown size={18} />
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
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
