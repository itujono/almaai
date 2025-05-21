"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import FormField from "../form/form-field";
import Select from "./base";
import type { SelectProps } from "./base";

interface FormSelectProps<T extends FieldValues> extends Omit<SelectProps, "value" | "onValueChange" | "error"> {
  name: Path<T>;
  control: Control<T>;
}

export default function FormSelect<T extends FieldValues>({ name, control, ...props }: FormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select {...props} value={field.value ?? ""} onValueChange={field.onChange} error={fieldState.error?.message} />
      )}
    />
  );
}
