import * as React from "react";
import { Select as SelectBase } from "@base-ui-components/react/select";
import { Check, ChevronDown } from "lucide-react";
import styles from "./select.module.css";
import FormField from "../form/form-field";
import { Control, FieldValues, Path } from "react-hook-form";
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps<T extends FieldValues> extends Omit<React.ComponentProps<typeof SelectBase.Root>, "children"> {
  name: Path<T>;
  placeholder?: string;
  options: SelectOption[];
  control: Control<T>;
}

export default function Select<T extends FieldValues>({
  name,
  placeholder,
  options,
  control,
  ...props
}: SelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={styles.field}>
          <SelectBase.Root {...props} onValueChange={field.onChange} value={field.value}>
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
          {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
