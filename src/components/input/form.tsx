"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import FormField from "../form/form-field";
import Input from "./base";
import type { InputProps } from "./base";

interface FormInputProps<T extends FieldValues> extends Omit<InputProps, "name" | "error"> {
  name: Path<T>;
  control: Control<T>;
}

export default function FormInput<T extends FieldValues>({ name, control, ...props }: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => <Input {...props} {...field} error={fieldState.error?.message} />}
    />
  );
}
