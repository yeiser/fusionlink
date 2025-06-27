import { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number, search?: string) => void;
}

const Paginator: FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
        Anterior
      </button>

      <div className="flex items-center gap-1">
        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              page === currentPage
                ? "bg-primary text-gray-700 dark:bg-primary dark:text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        {totalPages > 5 && currentPage <= totalPages - 4 && <span className="px-2 text-gray-500 dark:text-gray-400">...</span>}
        {totalPages > 5 && (
          <button
            onClick={() => onPageChange(totalPages)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              currentPage === totalPages
                ? "bg-primary text-white dark:bg-primary dark:text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {totalPages}
          </button>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Paginator;