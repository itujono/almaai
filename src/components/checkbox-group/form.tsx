"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import FormField from "../form/form-field";
import CheckboxGroup from "./base";
import type { CheckboxGroupProps } from "./base";

interface FormCheckboxGroupProps<T extends FieldValues>
  extends Omit<CheckboxGroupProps, "value" | "onValueChange" | "error" | "defaultValue"> {
  name: Path<T>;
  control: Control<T>;
}

export default function FormCheckboxGroup<T extends FieldValues>({
  name,
  control,
  ...props
}: FormCheckboxGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <CheckboxGroup
          {...props}
          value={field.value ?? []}
          onValueChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
