"use client";
import React, { FC, use } from "react";
import Modal from "./Modal";
import { ProductAddForm } from "./ProductAddForm";
import { useModal } from "@/hooks/useModal";

export const ModalUpdateProducts: FC = () => {
  const { isOpen, onOpen, onClose } = useModal();
  return (
    <React.Fragment>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onOpen}
      >
        Update product
      </button>
      <Modal isOpen={isOpen} onClose={onClose} withCloseButton={true}>
        In future updates
      </Modal>
    </React.Fragment>
  );
};
