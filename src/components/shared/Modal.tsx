import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  responsive?: boolean;
  withCloseButton?: boolean;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  withCloseButton,
  responsive = false,
}) => {
  const [isClickedInside, setIsClickedInside] = React.useState(false);
  if (!isOpen) return null;

  return createPortal(
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setIsClickedInside(true);
        }
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => {
        if (isClickedInside) {
          onClose();
          setIsClickedInside(false);
        }
      }}
    >
      <div
        className={cn(
          "bg-white rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]",
          !responsive ? "max-w-[500px] w-full" : ""
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {withCloseButton && (
          <button
            className="absolute top-1 right-1 text-white font-bold size-6 bg-red-500 rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Х
          </button>
        )}
        <div className="w-full flex flex-col items-center">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
