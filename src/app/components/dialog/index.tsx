import * as React from "react";
import { Dialog as DialogBase } from "@base-ui-components/react/dialog";
import styles from "./dialog.module.css";

type DialogDefaultProps = React.ComponentProps<typeof DialogBase.Root> & {
  triggerText: string;
  titleText: string;
  descriptionText: string;
  closeText?: string;
  children?: React.ReactNode;
};

function DialogComponent({
  triggerText,
  titleText,
  descriptionText,
  closeText = "Close",
  children,
  ...props
}: DialogDefaultProps) {
  return (
    <DialogBase.Root {...props}>
      <DialogBase.Trigger className={styles.Button}>{triggerText}</DialogBase.Trigger>
      <DialogBase.Portal>
        <DialogBase.Backdrop className={styles.Backdrop} />
        <DialogBase.Popup className={styles.Popup}>
          <DialogBase.Title className={styles.Title}>{titleText}</DialogBase.Title>
          <DialogBase.Description className={styles.Description}>{descriptionText}</DialogBase.Description>
          {children && <div className="custom-dialog-content">{children}</div>}
          <div className={styles.Actions}>
            <DialogBase.Close className={styles.Button}>{closeText}</DialogBase.Close>
          </div>
        </DialogBase.Popup>
      </DialogBase.Portal>
    </DialogBase.Root>
  );
}

DialogComponent.Root = DialogBase.Root;

DialogComponent.Trigger = (props: React.ComponentProps<typeof DialogBase.Trigger>) => (
  <DialogBase.Trigger className={styles.Button} {...props} />
);

DialogComponent.Portal = DialogBase.Portal;

DialogComponent.Backdrop = (props: React.ComponentProps<typeof DialogBase.Backdrop>) => (
  <DialogBase.Backdrop className={styles.Backdrop} {...props} />
);

DialogComponent.Popup = (props: React.ComponentProps<typeof DialogBase.Popup>) => (
  <DialogBase.Popup className={styles.Popup} {...props} />
);

DialogComponent.Title = (props: React.ComponentProps<typeof DialogBase.Title>) => (
  <DialogBase.Title className={styles.Title} {...props} />
);

DialogComponent.Description = (props: React.ComponentProps<typeof DialogBase.Description>) => (
  <DialogBase.Description className={styles.Description} {...props} />
);

DialogComponent.Close = (props: React.ComponentProps<typeof DialogBase.Close>) => (
  <DialogBase.Close className={styles.Button} {...props} />
);

export default DialogComponent;
