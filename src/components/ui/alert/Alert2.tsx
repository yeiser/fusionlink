import { X, CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title: string;
  dismissible?: boolean;
  className?: string;
}

const typeStyles = {
  success: {
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    ring: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-600',
    text: 'text-green-800 dark:text-green-100',
  },
  info: {
    icon: <Info className="h-5 w-5 text-blue-600" />,
    ring: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-600',
    text: 'text-blue-800 dark:text-blue-100',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    ring: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-600',
    text: 'text-yellow-800 dark:text-yellow-100',
  },
  error: {
    icon: <XCircle className="h-5 w-5 text-red-600" />,
    ring: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-600',
    text: 'text-red-800 dark:text-red-100',
  },
};

export const Alert2 = ({
  type = 'success',
  title,
  dismissible = true,
  className,
}: AlertProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const { icon, ring, border, text } = typeStyles[type];

  return (
    <div
      className={clsx(
        'relative w-full rounded-xl border px-4 py-1 shadow-md bg-white dark:bg-gray-800',
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <div className={clsx('rounded-full p-2', ring)}>{icon}</div>
        <p className={clsx('font-semibold', text)}>{title}</p>
        {dismissible && (
          <button
            onClick={() => setVisible(false)}
            className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className={clsx('absolute bottom-0 left-0 right-0 h-[3px] rounded-b-xl', border)} />
    </div>
  );
};