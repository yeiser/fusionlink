import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { ErrorAlert } from "../common/ErrorAlert";

interface Props {
  onLogin: (email: string, password: string, rememberMe: boolean) => void;
  errorMessage?: string | null;
}

export default function SignInForm({ onLogin, errorMessage }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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
    if (!password) {
      setValidationError("La contraseña es obligatoria.");
      return false;
    }
    if (password.length < 6) {
      setValidationError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    setValidationError(null); // No hay errores
    return true;
  };

  const handleClick = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onLogin(email, password, isChecked);
    } finally {
      setLoading(false);
    }
  };

  const finalError = validationError || errorMessage;

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Ingresar
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu correo electrónico y contraseña para acceder
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
                  <Label>
                    Contraseña <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Mantenerme logueado
                    </span>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Olvidé mi contraseña
                  </Link>
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
                      "Ingresar"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Registrarme
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
