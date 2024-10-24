import React, { useCallback } from "react";

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  return {
    isOpen,
    onOpen,
    onClose,
  };
};
