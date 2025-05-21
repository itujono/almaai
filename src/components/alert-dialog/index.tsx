import { AlertDialog as AlertDialogBase } from "@base-ui-components/react/alert-dialog";
import styles from "./alert.module.css";
import Button from "../button";
import type { ComponentProps } from "react";

interface AlertDialogProps extends React.ComponentProps<typeof AlertDialogBase.Root> {
  title: string;
  description: string;
  children: React.ReactNode;
  triggerText?: string;
}

interface AlertDialogContentProps {
  children: React.ReactNode;
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  size?: "medium" | "small";
}

interface AlertDialogButtonProps extends Omit<ButtonProps, "className"> {
  children: React.ReactNode;
}

export function AlertDialog({ title, description, children, triggerText, ...props }: AlertDialogProps) {
  return (
    <AlertDialogBase.Root {...props}>
      <AlertDialogBase.Portal>
        <AlertDialogBase.Backdrop className={styles.Backdrop} />
        <AlertDialogBase.Popup className={styles.Popup}>
          <AlertDialogBase.Title className={styles.Title}>{title}</AlertDialogBase.Title>
          <AlertDialogBase.Description className={styles.Description}>{description}</AlertDialogBase.Description>
          {children}
        </AlertDialogBase.Popup>
      </AlertDialogBase.Portal>
    </AlertDialogBase.Root>
  );
}

export function AlertDialogContent({ children }: AlertDialogContentProps) {
  return <div className={styles.Actions}>{children}</div>;
}

export function AlertDialogCancel({ children, ...props }: AlertDialogButtonProps) {
  return (
    <AlertDialogBase.Close
      render={(buttonProps) => (
        <Button variant="secondary" {...props} {...(buttonProps as ButtonProps)}>
          {children}
        </Button>
      )}
    >
      {children}
    </AlertDialogBase.Close>
  );
}
