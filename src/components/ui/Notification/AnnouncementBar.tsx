import { Zap } from 'lucide-react';
import clsx from 'clsx';

interface AnnouncementBarProps {
  title: string;
  description: string;
  textButton: string;
  onUpdate: () => void;
  className?: string;
}

export const AnnouncementBar = ({
  title,
  description,
  textButton,
  onUpdate,
  className,
}: AnnouncementBarProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-md bg-indigo-100 p-1 dark:bg-indigo-900/30">
          <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      <div className="flex gap-2 self-end sm:self-auto">
        <button
          onClick={onUpdate}
          className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {textButton}
        </button>
      </div>
    </div>
  );
};