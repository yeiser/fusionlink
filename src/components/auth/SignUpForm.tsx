import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { IdentificationTypes } from "../../core/domain/entities/core/IdentificationTypes";
import Select from "../form/Select";
import { capitalizeName } from "../../shared/utils/capitalizeName";
import { ErrorAlert } from "../common/ErrorAlert";

interface Props {
  onRegister: (tipoIdentificacion: string, identificacion: string, email: string, nombres: string, apellidos: string, clave: string, telefono: string) => void;
  errorMessage?: string | null;
}

export default function SignUpForm({onRegister, errorMessage}: Props) {
  const [tipoIdentificacion, setTipoIdentificacion] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [email, setEmail] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [clave, setClave] = useState("");
  const [confirmClave, setConfirmClave] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!tipoIdentificacion.trim()) {
      setValidationError("Seleccione un tipo de identificación.");
      return false;
    }
    if (!identificacion.trim()) {
      setValidationError("El campo identificación es obligatorio.");
      return false;
    }
    if (identificacion.length > 15) {
      setValidationError("El campo identificación no debe exceder los 15 caracteres.");
      return false;
    }
    if (!email.trim()) {
      setValidationError("El campo email es obligatorio.");
      return false;
    }
    if (email.length > 100) {
      setValidationError("El campo email no debe exceder los 100 caracteres.");
      return false;
    }
    if(!telefono.trim()){
      setValidationError("El campo teléfono es obligatorio.");
      return false;
    }
    if (telefono.length > 100) {
      setValidationError("El campo teléfono no debe exceder los 100 caracteres.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("El correo electrónico no es válido.");
      return false;
    }
    if(!nombres.trim()){
      setValidationError("El campo nombres es obligatorio.");
      return false;
    }
    if (nombres.length > 100) {
      setValidationError("El campo nombres no debe exceder los 100 caracteres.");
      return false;
    }
    if(!apellidos.trim()){
      setValidationError("El campo apellidos es obligatorio.");
      return false;
    }
    if (apellidos.length > 100) {
      setValidationError("El campo apellidos no debe exceder los 100 caracteres.");
      return false;
    }
    if (!clave) {
      setValidationError("La contraseña es obligatoria.");
      return false;
    }
    if (clave.length < 6) {
      setValidationError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    if (!confirmClave) {
      setValidationError("El campo confirmar contraseña es obligatorio.");
      return false;
    }
    if (clave !== confirmClave) {
      setValidationError("Las contraseñas no coinciden.");
      return false;
    }
    
    if(!isChecked){
      setValidationError("Debe aceptar los términos, condiciones y política de privacidad.");
      return false;
    }

    setValidationError(null); // No hay errores
    return true;
  };

  const handleClick = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await onRegister(tipoIdentificacion, identificacion, email, nombres, apellidos, clave, telefono);
    } finally {
      setLoading(false);
    }
  };

  const finalError = validationError || errorMessage

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
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
              Registrarse
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu información para registrarte.
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-5">
                {finalError && <ErrorAlert message={finalError} />}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>
                      Tipo de identificación<span className="text-error-500">*</span>
                    </Label>
                    <Select
                      options={IdentificationTypes}
                      placeholder="Seleccione una opción"
                      onChange={(value) => setTipoIdentificacion(value)}
                      className="dark:bg-dark-900"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label>
                      Identificación<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={identificacion}
                      onChange={(e) => setIdentificacion(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>
                      Nombres<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={nombres}
                      onChange={(e) => setNombres(capitalizeName(e.target.value))}
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Apellidos<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(capitalizeName(e.target.value))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />
                </div>
                <div className="sm:col-span-1">
                  <Label>
                    Teléfono<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>
                      Contraseña<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={"password"}
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                  <Label>
                    Confirmar contraseña<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={"password"}
                      value={confirmClave}
                      onChange={(e) => setConfirmClave(e.target.value)}
                    />
                  </div>
                </div>
                </div>

                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Al crear esta cuenta acepta{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terminos y condiciones,
                    </span>{" "}
                    y nuestra{" "}
                    <span className="text-gray-800 dark:text-white">
                      Política de privacidad
                    </span>
                  </p>
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
                      "Registrarme"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Ya tienes una cuenta? {""}
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
