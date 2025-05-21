import { AlertDialog as AlertDialogBase } from "@base-ui-components/react/alert-dialog";
import styles from "./alert.module.css";

interface AlertDialogProps extends React.ComponentProps<typeof AlertDialogBase.Root> {
  title: string;
  description: string;
  triggerText?: string;
  children: React.ReactNode;
  closeText?: string;
  okText?: string;
  onOk: () => void;
}

export default function AlertDialog({
  title,
  description,
  children,
  triggerText,
  closeText,
  onOk,
  okText,
  ...props
}: AlertDialogProps) {
  return (
    <AlertDialogBase.Root {...props}>
      <AlertDialogBase.Trigger data-color="red" className={styles.Button}>
        {triggerText}
      </AlertDialogBase.Trigger>
      <AlertDialogBase.Portal>
        <AlertDialogBase.Backdrop className={styles.Backdrop} />
        <AlertDialogBase.Popup className={styles.Popup}>
          <AlertDialogBase.Title className={styles.Title}>{title}</AlertDialogBase.Title>
          <AlertDialogBase.Description className={styles.Description}>{description}</AlertDialogBase.Description>
          <div className={styles.Actions}>
            <AlertDialogBase.Close className={styles.Button}>{closeText}</AlertDialogBase.Close>
            <AlertDialogBase.Close data-color="red" className={styles.Button} onClick={onOk}>
              {okText}
            </AlertDialogBase.Close>
          </div>
        </AlertDialogBase.Popup>
      </AlertDialogBase.Portal>
    </AlertDialogBase.Root>
  );
}

interface AlertDialogContentProps extends React.ComponentProps<typeof AlertDialogBase.Portal> {
  title: string;
  description: string;
}

AlertDialog.Content = function AlertDialogContent({ children, title, description, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogBase.Portal {...props}>
      <AlertDialogBase.Backdrop className={styles.Backdrop} />
      <AlertDialogBase.Popup className={styles.Popup}>
        <AlertDialogBase.Title className={styles.Title}>{title}</AlertDialogBase.Title>
        <AlertDialogBase.Description className={styles.Description}>{description}</AlertDialogBase.Description>
        {children}
      </AlertDialogBase.Popup>
    </AlertDialogBase.Portal>
  );
};

export { AlertDialog };
