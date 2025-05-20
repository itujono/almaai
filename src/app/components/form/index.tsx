import { Form as FormBase } from "@base-ui-components/react/form";
import styles from "./form.module.css";

type FormProps = React.ComponentProps<typeof FormBase>;

export default function Form({ onSubmit, ...props }: FormProps) {
  return <FormBase className={styles.form} {...props} />;
}
