import { useRef, useState } from "react";
import { Link } from "react-router";
import Label from "../form/Label";
import { ErrorAlert } from "../common/ErrorAlert";
import { ChevronLeftIcon } from "../../icons";

interface Props {
  onVerificationCode: (email: string, validationCode: string) => void;
  correo: string;
  errorMessage?: string | null;
}

export default function VerificationCodeForm({ onVerificationCode, errorMessage, correo }: Props) {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [code, setCode] = useState(Array(6).fill(""));

  const handleChange = (index: number, value: string) => {
    const char = value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // solo letras A-Z

    if (char.length > 1) return;

    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validate = () => {
    if (code.some(c => c === "")) {
      setValidationError("Por favor completa todos los campos.");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleClick = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onVerificationCode(correo, code.join(""));
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
              Verificación de identidad
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Por favor revisa el buzón de entrada de tu correo electrónico { correo }, hemos enviado un código de validación de autenticación de tu cuenta.
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                {finalError && <ErrorAlert message={finalError} />}
                <div>
                  <Label>
                    Código de validación <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="flex gap-2 sm:gap-4">
                    {code.map((char, index) => (
                      <input
                        key={index}
                        ref={(el) => {inputRefs.current[index] = el}}
                        type="text"
                        maxLength={1}
                        value={char}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-full h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ))}
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
                      "Validar código"
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
