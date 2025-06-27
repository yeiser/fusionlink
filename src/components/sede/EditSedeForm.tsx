import { useEffect, useState } from "react";
import { Departamento } from "../../core/domain/entities/core/Departamento";
import { Municipio } from "../../core/domain/entities/core/Municipio";
import { ErrorAlert } from "../common/ErrorAlert";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { SedeDto } from "../../core/domain/dtos/sede/SedeDto";
import Switch from "../form/switch/Switch";

interface EditSedeFormProps{
    sede: SedeDto;
    departamentos: Departamento[];
    municipios: Municipio[];
    errorMessage: string | null;
    loading: boolean;
    onClose: () => void;
    onSave: (sedeEditado: SedeDto) => void;
    setSelectedDepartamento: (value: number) => void;
    setErrorMessage: (value: string | null) => void;
    setLoading: (value: boolean) => void;
}

export default function EditSedeForm({
    sede,
    departamentos,
    municipios,
    errorMessage,
    loading,
    onClose,
    onSave,
    setSelectedDepartamento,
    setErrorMessage,
    setLoading
}: EditSedeFormProps){

    const [nombre, setNombre] = useState(sede.nombre);
    const [direccion, setDireccion] = useState(sede.direccion);
    const [telefono, setTelefono] = useState(sede.telefono);
    const [departamentoId, setDepartamentoId] = useState<number | null>(sede.departamentoId);
    const [municipioId, setMunicipioId] = useState<number | null>(sede.municipioId);
    const [activo, setActivo] =useState<boolean>(sede.activo);

    const handleSubmit = async () => {
        if(!validate()) return;
        try{
            setLoading(true);
            const sedeEditada: SedeDto = {
                ...sede,
                nombre,
                direccion,
                telefono,
                departamentoId: departamentoId ?? sede.departamentoId,
                municipioId: municipioId ?? sede.municipioId,
                activo: activo ?? sede.activo
            };
            await onSave(sedeEditada);
        }
        catch(err){
            setErrorMessage("Ocurrió un error al editar la sede.");
            console.log((err as Error).message);
        }finally{
            setLoading(false);
        }
    };

    const validate = () => {
        if(!nombre.trim()){
            setErrorMessage("El campo nombre es obligatorio.");
            return false;
        }
        if (nombre.length > 100) {
            setErrorMessage("El campo nombre o razon social no debe exceder los 100 caracteres.");
            return false;
        }
        if(!direccion.trim()){
            setErrorMessage("El campo dirección es obligatorio.");
            return false;
        }
        if (direccion.length > 100) {
            setErrorMessage("El campo dirección no debe exceder los 100 caracteres.");
            return false;
        }
        if(!telefono.trim()){
            setErrorMessage("El campo teléfono es obligatorio.");
            return false;
        }
        if (telefono.length > 20) {
            setErrorMessage("El campo dirección no debe exceder los 20 caracteres.");
            return false;
        }
        if(!departamentoId){
            setErrorMessage("Debe seleccionar un departamento.");
            return false;
        }
        if(!municipioId){
            setErrorMessage("Debe seleccionar un municipio.");
            return false;
        }

        setErrorMessage(null);
        return true;
    }

    useEffect(() => {
        if (sede.departamentoId) {
            setSelectedDepartamento(sede.departamentoId);
        }
    }, [sede.departamentoId, setSelectedDepartamento]);

    return(
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Actualizar sede
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Actualiza la información de las sedes de tu empresa.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              {errorMessage && <ErrorAlert message={errorMessage} />}
              <div className="mt-7">

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-2">
                    <Label>Nombre</Label>
                    <Input 
                        type="text" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} />
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
                  
                  <div className="col-span2 lg:col-span-1">
                    <Switch
                        label={activo ? "ACTIVO" : "INACTIVO"}
                        defaultChecked={activo}
                        onChange={(checked) => setActivo(checked)}
                        />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button size="sm"
                    type="button"
                    className={`flex items-center justify-center gap-2 p-2 rounded text-white h-10 ${
                      loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={handleSubmit}
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
    )
}