import { useState, useCallback } from "react";

/**
 * Hook para controlar múltiples tipos de modal.
 * @template T Tipo del modal (string literal union recomendado).
 */
export const useMultiModal = <T extends string | null = string | null>() => {
  const [modalType, setModalType] = useState<T | null>(null);

  const openModal = useCallback((type: T) => setModalType(type), []);
  const closeModal = useCallback(() => setModalType(null), []);
  const toggleModal = useCallback(
    (type: T) => setModalType((prev) => (prev === type ? null : type)),
    []
  );

  return {
    modalType,
    isOpen: modalType !== null,
    openModal,
    closeModal,
    toggleModal,
  };
};