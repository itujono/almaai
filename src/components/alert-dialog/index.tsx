import { AlertDialog as AlertDialogBase } from "@base-ui-components/react/alert-dialog";
import styles from "./alert.module.css";
import Button from "../button";

interface AlertDialogProps extends React.ComponentProps<typeof AlertDialogBase.Root> {
  title: string;
  description: string;
  triggerText?: string;
  children?: React.ReactNode;
  closeText?: string | React.ReactNode;
  okText?: string | React.ReactNode;
  onOk: () => void;
}

export default function AlertDialog({
  title,
  description,
  children,
  triggerText,
  closeText = "Cancel",
  onOk,
  okText,
  ...props
}: AlertDialogProps) {
  return (
    <AlertDialogBase.Root {...props}>
      <AlertDialogBase.Trigger
        render={(props) => (
          <Button {...props} size="small">
            {triggerText}
          </Button>
        )}
      />
      <AlertDialogBase.Portal>
        <AlertDialogBase.Backdrop className={styles.Backdrop} />
        <AlertDialogBase.Popup className={styles.Popup}>
          <AlertDialogBase.Title className={styles.Title}>{title}</AlertDialogBase.Title>
          <AlertDialogBase.Description className={styles.Description}>{description}</AlertDialogBase.Description>
          <div className={styles.Actions}>
            <AlertDialogBase.Close
              render={(props) => (
                <Button variant="secondary" {...props}>
                  {closeText}
                </Button>
              )}
            >
              {closeText}
            </AlertDialogBase.Close>
            <AlertDialogBase.Close
              render={(props) => (
                <Button variant="primary" {...props} onClick={onOk}>
                  {okText}
                </Button>
              )}
            >
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
