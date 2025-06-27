import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { GetUbicacionUseCase } from "../../core/usecases/ubicacion/GetUbicacionUseCase";
import Select from "../form/Select";
import { ErrorAlert } from "../common/ErrorAlert";
import { AttachBase64Dto } from "../../core/domain/dtos/common/AttachBase64Dto";
import { toBase64 } from "../../shared/utils/toBase64";
import FileInput from "../form/input/FileInput";

interface Props {
  onCreate: (nit: string, razonSocial: string, direccion: string, telefono: string, email: string, sitioWeb: string, logo: AttachBase64Dto | null, departamento: number | null, municipio: number | null, ) => void;
  errorMessage?: string | null;
}

export default function CreateEmpresaForm({ onCreate, errorMessage}: Props){
    const { closeModal} = useModal();
    const {departamentos, municipios, setSelectedDepartamento} = GetUbicacionUseCase();
    const [ nit, setNit ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ razonSocial, setRazonSocial ] = useState("");
    const [ sitioWeb, setSitioWeb ] = useState("");
    const [ direccion, setDireccion ] = useState("");
    const [ telefono, setTelefono ] = useState("");
    const [ departamento, setDepartamento ] = useState<number | null>(null);
    const [ municipio, setMunicipio ] = useState<number | null>(null);
    const [ fileDto, setFileDto ] = useState<AttachBase64Dto | null>(null)
    const [ validationError, setValidationError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState(false);

    const handleSave = async () =>{
        if (!validate()) return;
            setLoading(true);
        try {
            await onCreate(nit, razonSocial, direccion, telefono, email, sitioWeb, fileDto, departamento, municipio);
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) return;

        const base64 = await toBase64(file);
        const dto: AttachBase64Dto = {
            base64: base64.split(',')[1],
            fileName: file.name,
            contentType: file.type
        }
        setFileDto(dto);
    }

    const validate = () => {
        if (!nit.trim()) {
            setValidationError("El campo nit es obligatorio.");
            return false;
        }
        if (nit.length > 9) {
            setValidationError("El campo identificación no debe exceder los 9 caracteres.");
            return false;
        }
        if (!email.trim()) {
            setValidationError("El campo correo electrónico es obligatorio.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setValidationError("El correo electrónico no es válido.");
            return false;
        }
        if (!razonSocial.trim()) {
            setValidationError("El campo nombre o razon social es obligatorio.");
            return false;
        }
        if (razonSocial.length > 100) {
            setValidationError("El campo nombre o razon social no debe exceder los 100 caracteres.");
            return false;
        }
        if (!direccion.trim()) {
            setValidationError("El campo dirección es obligatorio.");
            return false;
        }
        if (direccion.length > 100) {
            setValidationError("El campo dirección no debe exceder los 100 caracteres.");
            return false;
        }
        if (!telefono.trim()) {
            setValidationError("El campo teléfono es obligatorio.");
            return false;
        }
        if (telefono.length > 20) {
            setValidationError("El campo dirección no debe exceder los 20 caracteres.");
            return false;
        }
        if (!departamento) {
            setValidationError("Seleccione un departamento.");
            return false;
        }
        if (!municipio) {
            setValidationError("Seleccione un municipio.");
            return false;
        }
        if(!fileDto){
            setValidationError("Seleccione una imagen para el logo de su empresa.");
            return false;
        }

        setValidationError(null);
        return true;
    }

    const finalError = validationError || errorMessage

    return(
        <>
        
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Crear empresa
                </h4>
                <p className="mb-3 text-sm text-gray-500 dark:text-gray-400 lg:mb-3">
                Ingresa la información de la empresa
                </p>
            </div>
            <form className="flex flex-col">
                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                {finalError && <ErrorAlert message={finalError} />}
                <div className="mt-7">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-2">
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
                            <Label>Correo electrónico</Label>
                            <Input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                            <Label>Nombre o razón social</Label>
                            <Input 
                                type="text" 
                                value={razonSocial}
                                onChange={(e) => setRazonSocial(e.target.value)} />
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
                                    setDepartamento(Number(value));
                                    setMunicipio(null);
                                }}
                                className="dark:bg-dark-900" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label>Municipio</Label>
                            <Select
                                options={municipios.map((m) => ({
                                    value: String(m.id),
                                    label: m.nombre
                                }))}
                                onChange={(value) => setMunicipio(Number(value))}
                                className="dark:bg-dark-900"
                            />
                        </div>

                        <div className="col-span-2 lg:col-span-2">
                            <Label>Logotipo</Label>
                            <FileInput
                                onChange={handleFileChange}
                                className="custom-class"
                             />
                        </div>
                    </div>
                </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" 
                    variant="outline" 
                    onClick={closeModal}>
                    Cerrar
                </Button>
                <Button size="sm"
                    type="button"
                    className={`flex items-center justify-center gap-2 p-2 rounded text-white h-10 ${
                      loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={handleSave}
                    disabled={loading}>
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Guardar"
                    )}
                </Button>
                </div>
            </form>
            </div>
        </>
    );
};
