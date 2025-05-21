import { Form as FormBase } from "@base-ui-components/react/form";
import { Fieldset as FieldsetBase } from "@base-ui-components/react/fieldset";
import styles from "./form.module.css";

type FormProps = React.ComponentProps<typeof FormBase>;
type FieldsetProps = React.ComponentProps<typeof FieldsetBase.Root> & {
  legend: string;
};

export default function Form(props: FormProps) {
  return <FormBase className={styles.form} {...props} />;
}

export function Fieldset({ children, legend, ...props }: FieldsetProps) {
  return (
    <FieldsetBase.Root className={styles.fieldset} {...props}>
      <FieldsetBase.Legend className={styles.legend}>{legend}</FieldsetBase.Legend>
      {children}
    </FieldsetBase.Root>
  );
}
