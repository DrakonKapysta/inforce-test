"use client";
import React, { FC, use } from "react";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";
import { CommentAddForm } from "./CommentAddForm";

interface ModalAddCommentProps {
  productId?: number;
}

export const ModalAddComment: FC<ModalAddCommentProps> = ({ productId }) => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <React.Fragment>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={onOpen}
      >
        Add comment
      </button>
      <Modal isOpen={isOpen} onClose={onClose} withCloseButton={true}>
        <CommentAddForm productId={productId} />
      </Modal>
    </React.Fragment>
  );
};
