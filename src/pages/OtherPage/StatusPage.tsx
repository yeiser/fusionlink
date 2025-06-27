
import PageMeta from "../../components/common/PageMeta";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";

type StatusType = "success" | "error" | "info";

interface StatusPageProps {
  type: StatusType;
  message: string;
  redirectUrl: string;
  textBtn: string;
}

const titles = {
  success: "EXCELENTE!",
  error: "ERROR!",
  info: "INFO",
};

export default function StatusPage({ type, message, redirectUrl, textBtn }: StatusPageProps) {
  return (
    <>
      <PageMeta 
        title="FusionLink" 
        description="" 
       />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />

        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
            <div className="flex justify-center">
                {type === "success" && (
                    <>
                        <img src="/images/error/success.svg" alt="404" className="dark:hidden" />
                        <img src="/images/error/success-dark.svg" alt="404" className="hidden dark:block"/>
                    </>
                )}
            </div>
          
          <h1 className="mb-2 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">{titles[type]}</h1>
          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">{message}</p>

          <Link
            to={redirectUrl}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            {textBtn}
          </Link>
        </div>
      </div>
    </>
  );
}