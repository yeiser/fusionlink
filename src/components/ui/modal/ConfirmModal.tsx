import { FC } from "react";
import { Modal } from ".";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Sí, continuar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} className="max-w-[507px]">
        <div className="flex flex-col px-4 py-4 overflow-y-auto no-scrollbar">
            <div className="p-6 text-center">
                <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">{title}</h3>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">{message}</p>

                <div className="flex justify-center gap-4">
                <button
                    onClick={onCancel}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    disabled={loading}
                >
                    {cancelText}
                </button>

                <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                >
                    {loading ? "Procesando..." : confirmText}
                </button>
                </div>
            </div>
        </div>
    </Modal>
  );
};

export default ConfirmModal;