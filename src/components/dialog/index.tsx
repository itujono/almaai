import * as React from "react";
import { Dialog as DialogBase } from "@base-ui-components/react/dialog";
import styles from "./dialog.module.css";

interface DialogHeaderProps {
  icon?: React.ReactNode;
  titleText: string;
  descriptionText?: string;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ icon, titleText, descriptionText }) => {
  return (
    <>
      {icon && <div className={styles.IconSlot}>{icon}</div>}
      <DialogBase.Title className={styles.Title}>{titleText}</DialogBase.Title>
      {descriptionText && (
        <DialogBase.Description className={styles.Description}>{descriptionText}</DialogBase.Description>
      )}
    </>
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  closeText?: string;
  closeButton?: React.ReactNode | null;
}

const DialogContent: React.FC<DialogContentProps> = ({ children, closeText = "Close", closeButton = null }) => {
  return (
    <DialogBase.Portal>
      <DialogBase.Backdrop className={styles.Backdrop} />
      <DialogBase.Popup className={styles.Popup}>
        {children}
        <div className={styles.Actions}>
          {!closeButton ? null : <DialogBase.Close className={styles.Button}>{closeText}</DialogBase.Close>}
        </div>
      </DialogBase.Popup>
    </DialogBase.Portal>
  );
};

const Root = DialogBase.Root;
const Trigger = ({ className, ...props }: React.ComponentProps<typeof DialogBase.Trigger>) => (
  <DialogBase.Trigger className={`${styles.Button} ${className}`} {...props} />
);
const Portal = DialogBase.Portal;
const Backdrop = ({ className, ...props }: React.ComponentProps<typeof DialogBase.Backdrop>) => (
  <DialogBase.Backdrop className={`${styles.Backdrop} ${className}`} {...props} />
);
const Popup = ({ className, ...props }: React.ComponentProps<typeof DialogBase.Popup>) => (
  <DialogBase.Popup className={`${styles.Popup} ${className}`} {...props} />
);
const Title = ({ className, ...props }: React.ComponentProps<typeof DialogBase.Title>) => (
  <DialogBase.Title className={`${styles.Title} ${className}`} {...props} />
);
const Description = ({ className, ...props }: React.ComponentProps<typeof DialogBase.Description>) => (
  <DialogBase.Description className={`${styles.Description} ${className}`} {...props} />
);
const Close = ({ className, ...props }: React.ComponentProps<typeof DialogBase.Close>) => (
  <DialogBase.Close className={`${styles.Button} ${className}`} {...props} />
);

const Dialog = {
  Root,
  Trigger,
  Content: DialogContent,
  Header: DialogHeader,
  Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Close,
};

export default Dialog;
