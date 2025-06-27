import { useState } from "react";
import { Link } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { ErrorAlert } from "../common/ErrorAlert";
import { ChevronLeftIcon } from "../../icons";

interface Props {
  onForgotPassword: (email: string) => void;
  errorMessage?: string | null;
}

export default function ForgotPasswordForm({ onForgotPassword, errorMessage }: Props) {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!email.trim()) {
      setValidationError("El correo es obligatorio.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("El correo electrónico no es válido.");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleClick = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onForgotPassword(email);
    } finally {
      setLoading(false);
    }
  };

  const finalError = validationError || errorMessage;

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Regresar
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Olvidaste tu contraseña?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu correo electrónico para restablecerla
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                {finalError && <ErrorAlert message={finalError} />}
                <div>
                  <Label>
                    Correo electrónico <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@gmail.com" />
                </div>
                <div>
                  <button
                    type="button"
                    className={`flex items-center w-full justify-center gap-2 p-2 rounded text-white h-10 ${
                      loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={handleClick}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Enviame un código"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                <Link
                  to="/"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Ingresar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
