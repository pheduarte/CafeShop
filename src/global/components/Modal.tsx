import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  modalClassName?: string;
};

export function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName,
  modalClassName,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={overlayClassName} onClick={onClose}>
      <div
        className={`${modalClassName} open`}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
