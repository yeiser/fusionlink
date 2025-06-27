import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const { empresa } = useAuth()

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center w-1/2">
              {
                !empresa ? (
                  <Link to="/" className="block mb-4">
                    <img
                      width={400}
                      height={70}
                      src="/images/logo/auth-logo.svg"
                      alt="Logo"
                    />
                </Link>
                ) : (
                  <>
                  <div className="w-50 h-50 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 mb-5">
                    <img className="w-full h-full"
                      src={empresa.logo}
                      alt="Logo"
                    />
                  </div>
                  </>
                )
              }
              {
                empresa && (
                  <h1 className="mb-7 font-semibold text-gray-400 dark:text-white/60 sm:text-title-md text-center">
                    {empresa.razonSocial}
                  </h1>
                )
              }
              <p className="text-center text-gray-400 dark:text-white/60">
                Estamos encantados de darte la bienvenida a una plataforma diseñada especialmente para ti.
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
