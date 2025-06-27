import React, { useState, useRef, useEffect } from "react";

export interface Actions{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
};

interface DropDownActionProps{
    actions: Actions[];
};

export const DropdownActions: React.FC<DropDownActionProps> = ({ actions }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if(dropdownRef.current && ! dropdownRef.current.contains(event.target as Node)){
            setOpen(false);
        }
    };

    useEffect(() =>{
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="absolute" ref={dropdownRef}>
        <button
            onClick={() => setOpen(!open)}
            className="text-gray-500 dark:text-gray-400"
        >
            <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
            />
            </svg>
        </button>

        {open && (
            <div className="absolute right-0 z-70 mt-2 w-40 space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-800">
            {actions.map((action: Actions, index: number) => (
                <button
                key={index}
                onClick={() => {
                    action.onClick();
                    setOpen(false); // opcional: cerrar después de acción
                }}
                className="text-theme-xs flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                {action.icon && <span>{action.icon}</span>}
                {action.label}
                </button>
            ))}
            </div>
        )}
        </div>
  );
};