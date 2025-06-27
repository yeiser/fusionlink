import { PackageOpenIcon } from "lucide-react";
import Button from "../ui/button/Button";

interface Props {
  title: string;
  description: string;
  textButton?: string;
  onCreate?: () => void;
  onClose?: () => void;
  textClose?: string;
}

const EmptyState = ({ title, description, textButton, onCreate, onClose, textClose} : Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="w-full max-w-xl border-2 border-gray-300 bg-white dark:bg-gray-800 shadow-md rounded-xl p-10 text-center space-y-6">
        <div className="flex items-center justify-center w-50 h-50 rounded-full bg-gray-100 dark:bg-gray-700 mx-auto">
          <PackageOpenIcon className="h-30 w-30 text-gray-500 dark:text-gray-300" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            {description}
          </p>
        </div>
        {onCreate && (
          <Button onClick={onCreate} className="text-theme-sm shadow-theme-xs inline-flex h-10 items-center m-2 gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            {textButton}
          </Button>
        )}
        {
          onClose && (
            <Button onClick={onClose} className="text-theme-sm shadow-theme-xs inline-flex h-10 items-center m-2 gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              {textClose}
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default EmptyState;
