import { useState } from "react";
import { Link } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { ErrorAlert } from "../common/ErrorAlert";
import { ChevronLeftIcon } from "../../icons";

interface Props {
  email: string;
  onResetPassword: (email: string, password: string) => void;
  errorMessage?: string | null;
}

export default function SignInForm({ onResetPassword, errorMessage, email }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const validate = () => {

    if (!password) {
      setValidationError("Asigne la nueva contraseña.");
      return false;
    }
    if (password.length < 6) {
      setValidationError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    if (!confirmPassword) {
      setValidationError("Confirme la nueva contraseña.");
      return false;
    }
    if(password !== confirmPassword){
        setValidationError("Las contraseñas no coinciden.");
        return false;
    }

    setValidationError(null); // No hay errores
    return true;
  };

  const handleClick = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onResetPassword(email, password);
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
              Restablecer Contraseña
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa y confirma tu nueva contraseña para acceder
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                {finalError && <ErrorAlert message={finalError} />}
                <div>
                  <Label>
                    Nueva contraseña <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={"password"}
                      placeholder="Nueva contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>
                    Confirmar contraseña <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={"password"}
                      placeholder="Confirmar contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
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
                      "Restablecer"
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
