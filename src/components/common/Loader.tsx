
import { Loader2 } from "lucide-react";

type LoaderProps = {
  message?: string;
  fullScreen?: boolean;
};

export default function Loader({ message = "Cargando...", fullScreen = false }: LoaderProps) {
  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          : "flex flex-col items-center justify-center py-10"
      }`}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4 dark:text-gray-400" />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}
