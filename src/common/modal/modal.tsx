import { useEffect } from "react";
import ReactDOM from "react-dom";
import { classnames } from "@/helpers/utils";
import CloseIcon from "@/common/icons/CloseIcon";
import modalStyles from "./modal.module.scss";

export enum ModalSizes {
  small = "small",
  medium = "medium",
  big = "big",
  unresticted = "unresticted",
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  size: ModalSizes;
  isOpen: boolean;
  onClose: () => void;
  hideCloseButton?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Modal = ({
  size,
  hideCloseButton = false,
  children,
  isOpen,
  onClose,
  className,
  ...props
}: ModalProps) => {
  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  let portalRoot = document.getElementById("modal");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal");
    document.body.appendChild(portalRoot);
  }

  return ReactDOM.createPortal(
    <div className={modalStyles.overlay}>
      <div
        role="dialog"
        aria-modal="true"
        className={classnames(
          modalStyles.modal,
          modalStyles[`modal-${size}`],
          className || "",
        )}
        {...props}
      >
        {!hideCloseButton && (
          <button
            className={modalStyles.closeButton}
            type="button"
            onClick={onClose}
          >
            <CloseIcon aria-label="Close"></CloseIcon>
          </button>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("modal")!,
  );
};
