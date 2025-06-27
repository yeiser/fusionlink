import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useAuth } from "../../context/AuthContext";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import { useEffect, useState } from "react";
import { EmpresaApi } from "../../infrastructure/api/EmpresaApi";
import { EmpresaRepositoryImpl } from "../../data/repositories/empresa/EmpresaRepository";
import { UpdateEmpresaUseCase } from "../../core/usecases/empresa/UpdateEmpresaUseCase";
import { GetUbicacionUseCase } from "../../core/usecases/ubicacion/GetUbicacionUseCase";
import Select from "../form/Select";
import { ErrorAlert } from "../common/ErrorAlert";

export default function EmpresaInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { empresa, setCompany } = useAuth();
  const {departamentos, municipios, setSelectedDepartamento} = GetUbicacionUseCase();
  
  const [nit, setNit] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sitioWeb, setSitioWeb] = useState("");
  const [departamentoId, setDepartamentoId] = useState<number | null>(null);
  const [municipioId, setMunicipioId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setloading] = useState(false);

  const handleSave = async (nit: string, razonSocial: string, email: string, direccion: string, telefono: string, sitioWeb: string, departamentoId: number | null, municipioId: number | null) => {
    if(!validate()) return;
    setloading(true);
    try{
      const api = new EmpresaApi();
      const repo = new EmpresaRepositoryImpl(api);
      const updateEmpresaUseCase = new UpdateEmpresaUseCase(repo);
      const response = await updateEmpresaUseCase.execute({nit, razonSocial, email, direccion, telefono, sitioWeb, departamentoId, municipioId});
      if(response.success){
        setCompany(response.data);
        closeModal();
      }
    }
    catch(err){
      setErrorMessage("Ocurrió un error al editar la empresa");
      console.log((err as Error).message);
    }finally{
      setloading(false);
    }
  };

  useEffect(() => {
    if(isOpen && empresa){
      setNit(empresa.nit);
      setRazonSocial(empresa.razonSocial);
      setEmail(empresa.email);
      setSitioWeb(empresa.sitioWeb);
      setDireccion(empresa.direccion);
      setTelefono(empresa.telefono);
      setSelectedDepartamento(empresa.departamentoId);
      setDepartamentoId(empresa.departamentoId);
      setMunicipioId(empresa.municipioId);
    }
  }, [isOpen]);

  const validate = () => {
    if (!nit.trim()) {
            setErrorMessage("El campo nit es obligatorio.");
            return false;
        }
        if (nit.length > 9) {
            setErrorMessage("El campo identificación no debe exceder los 9 caracteres.");
            return false;
        }
        if (!email.trim()) {
            setErrorMessage("El campo correo electrónico es obligatorio.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage("El correo electrónico no es válido.");
            return false;
        }
        if (!razonSocial.trim()) {
            setErrorMessage("El campo nombre o razon social es obligatorio.");
            return false;
        }
        if (razonSocial.length > 100) {
            setErrorMessage("El campo nombre o razon social no debe exceder los 100 caracteres.");
            return false;
        }
        if (!direccion.trim()) {
            setErrorMessage("El campo dirección es obligatorio.");
            return false;
        }
        if (direccion.length > 100) {
            setErrorMessage("El campo dirección no debe exceder los 100 caracteres.");
            return false;
        }
        if (!telefono.trim()) {
            setErrorMessage("El campo teléfono es obligatorio.");
            return false;
        }
        if (telefono.length > 20) {
            setErrorMessage("El campo dirección no debe exceder los 20 caracteres.");
            return false;
        }
        if (!departamentoId) {
            setErrorMessage("Seleccione un departamento.");
            return false;
        }
        if (!municipioId) {
            setErrorMessage("Seleccione un municipio.");
            return false;
        }

        setErrorMessage(null);
        return true;
  }

  const finalError = errorMessage;

  dayjs.extend(relativeTime);
  dayjs.locale('es');

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Información de la empresa
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nit
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { empresa?.nit}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nombre o Razón social
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { empresa?.razonSocial }
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Correo electrónico
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {empresa?.email.toLowerCase()}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Dirección
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {empresa?.direccion}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Municipio
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {empresa?.municipio}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Departamento
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {empresa?.departamento}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Teléfono
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {empresa?.telefono}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Sitio web
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {empresa?.sitioWeb}
              </p>
            </div>
            <div className="col-span-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                URL
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {window.location.origin}/login/{empresa?.codigo}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Actualizar
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Información de la empresa
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Actualiza los datos de la empresa.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              {finalError && <ErrorAlert message={finalError} />}
              <div className="mt-7">

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nit</Label>
                    <Input 
                      type="text" 
                      value={nit}
                      onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                              setNit(value);
                          }
                      }}/>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nombre o razón social</Label>
                    <Input 
                        type="text" 
                        value={razonSocial}
                        onChange={(e) => setRazonSocial(e.target.value)} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Correo electrónico</Label>
                    <Input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                      <Label>Sitio web</Label>
                      <Input 
                          type="text" 
                          value={sitioWeb}
                          onChange={(e) => setSitioWeb(e.target.value)} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Dirección</Label>
                    <Input 
                        type="text" 
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Teléfono</Label>
                    <Input 
                        type="text" 
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)} />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                      <Label>Departamento</Label>
                      <Select 
                          options={departamentos.map((d) => ({
                              value: String(d.id),
                              label: d.nombre
                          }))} 
                          onChange={(value) => {
                              setSelectedDepartamento(Number(value));
                              setDepartamentoId(Number(value));
                              setMunicipioId(null);
                          }}
                          defaultValue={departamentoId ? String(departamentoId) : undefined}
                          className="dark:bg-dark-900" />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                      <Label>Municipio</Label>
                      <Select
                          options={municipios.map((m) => ({
                              value: String(m.id),
                              label: m.nombre
                          }))}
                          onChange={(value) => setMunicipioId(Number(value))}
                          defaultValue={municipioId ? String(municipioId) : undefined}
                          className="dark:bg-dark-900"
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cerrar
              </Button>
              <Button size="sm"
                    type="button"
                    className={`flex items-center justify-center gap-2 p-2 rounded text-white h-10 ${
                      loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={() => {handleSave(nit, razonSocial, email, direccion, telefono, sitioWeb, departamentoId, municipioId)}}
                    disabled={loading}>
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Actualizar"
                    )}
                </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
