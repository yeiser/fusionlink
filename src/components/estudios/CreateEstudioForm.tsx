import { useState } from "react";
import { AttachBase64Dto } from "../../core/domain/dtos/common/AttachBase64Dto";
import { IdentificationTypes } from "../../core/domain/entities/core/IdentificationTypes";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { toBase64 } from "../../shared/utils/toBase64";
import FileInput from "../form/input/FileInput";
import DatePicker from "../form/date-picker";
import { Metadatos } from "../../core/domain/dtos/common/Metadatos";
import { ErrorAlert } from "../common/ErrorAlert";

interface CreateEstudioFormProps{
    tipoIdentificacion: string;
    identificacion: string;
    nombrePaciente: string;
    nombreEstudio: string;
    fechaEstudio: Date | null;
    fechaReporte: Date | null;
    usuarioSubida: string;
    fileDto: AttachBase64Dto | null;
    metadatos: Metadatos[];
    errorMessage: string | null;
    loading: boolean;
    onClose: () => void;
    onSave: () => void;
    setIdentificacion: (value: string) => void;
    setTipoIdentificacion: (value: string) => void;
    setNombrePaciente: (value: string) => void;
    setNombreEstudio: (value: string) => void;
    setFechaEstudio: (value: Date) => void;
    setFechaReporte: (value: Date) => void;
    setUsuarioSubida: (value: string) => void;
    setFileDto: (value: AttachBase64Dto) => void;
    setMetadatos: (value: Metadatos[]) => void;
    setErrorMessage: (value: string | null) => void;
    setloading: (value: boolean) => void;
}

export default function CreateEstudioForm({
    identificacion,
    nombrePaciente,
    nombreEstudio,
    usuarioSubida,
    metadatos,
    errorMessage,
    loading,
    onClose,
    onSave,
    setIdentificacion,
    setTipoIdentificacion,
    setNombrePaciente,
    setNombreEstudio,
    setFechaEstudio,
    setFechaReporte,
    setUsuarioSubida,
    setFileDto,
    setMetadatos
}: CreateEstudioFormProps){

  const [campo, setCampo] = useState("");
  const [valor, setValor] = useState("");

  const agregarMetadato = () => {
    if (!campo.trim() || !valor.trim()) return;

    const nuevo: Metadatos = {
      campo: campo.trim(),
      valor: valor.trim()
    };

    setMetadatos([...metadatos, nuevo]);
    setCampo("");
    setValor("");
  };

  const eliminarMetadato = (index: number) => {
    const nuevos = [...metadatos];
    nuevos.splice(index, 1);
    setMetadatos(nuevos);
  };

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

    return (
  <>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
    {/* Título */}
    <div className="grid grid-cols-1 lg:grid-cols-2 px-2 pr-14 mb-6">
      <div>
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Cargar estudio
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Completa la información del estudio clínico
        </p>
      </div>
    </div>

    {/* Contenedor dividido en dos columnas */}
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      
      {/* Columna izquierda: formulario */}
      <div>
        <form className="space-y-6">
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-2">
            <div className="col-span-2 lg:col-span-1">
              <Label>Fecha del estudio</Label>
              <DatePicker
                id="fecha-estudio"
                placeholder="Seleccione una fecha"
                onChange={(dates) => {
                  setFechaEstudio(dates[0]);
                }}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Label>Fecha del reporte</Label>
              <DatePicker
                id="fecha-reporte"
                placeholder="Seleccione una fecha"
                onChange={(dates) => {
                  setFechaReporte(dates[0])
                }}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Label>Tipo de identificación</Label>
              <Select
                options={IdentificationTypes}
                onChange={(value) => setTipoIdentificacion(value)}
                placeholder="Seleccione una opción"
                className="dark:bg-dark-900"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Label>Identificación</Label>
              <Input
                type="text"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Label>Nombre del paciente</Label>
              <Input
                type="text"
                value={nombrePaciente}
                onChange={(e) => setNombrePaciente(e.target.value.toUpperCase())}
              />
            </div>
            <div className="col-span-2">
              <Label>Nombre del estudio</Label>
              <Input
                type="text"
                value={nombreEstudio}
                onChange={(e) => setNombreEstudio(e.target.value.toUpperCase())}
              />
            </div>
            <div className="col-span-2">
              <Label>Nombre del usuario</Label>
              <Input
                type="text"
                value={usuarioSubida}
                onChange={(e) => setUsuarioSubida(e.target.value.toUpperCase())}
              />
            </div>
            <div className="col-span-2">
              <Label>Logotipo</Label>
              <FileInput
                onChange={handleFileChange}
                className="custom-class"
                accept=".pdf"
              />
            </div>
          </div>
        </form>
      </div>
    </div>

    {/* Botones */}
    <div className="flex items-center gap-3 mt-6 justify-end px-2">
      <Button size="sm" variant="outline" onClick={onClose}>
        Cerrar
      </Button>
      <Button
        size="sm"
        type="button"
        className={`flex items-center justify-center gap-2 p-2 rounded text-white h-10 ${
          loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={onSave}
        disabled={loading}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Guardar"
        )}
      </Button>
    </div>
  </div>
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
    <div className="grid grid-cols-1 lg:grid-cols-1 px-2 pr-14 mb-6">
      <div>
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Metadatos
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Agrega los metadatos que consideres mas relevantes de este estudio clínico
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          <div>
            <Label>Campo</Label>
            <Input
              type="text"
              value={campo}
              onChange={(e) => setCampo(e.target.value)}
              placeholder="Ej: Tipo de muestra"
            />
          </div>
          <div>
            <Label>Valor</Label>
            <Input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Ej: Sangre"
            />
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="mb-4"
          onClick={agregarMetadato}
        >
          Agregar
        </Button>
        <div>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mt-3 max-h-101 overflow-y-auto custom-scrollbar pr-1">
          {metadatos.map((meta, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-3 py-2 rounded bg-gray-100 dark:bg-white/[0.05] border border-gray-300 dark:border-gray-700"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800 dark:text-white">
                  {meta.campo}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {meta.valor}
                </span>
              </div>
              <button
                type="button"
                className="text-red-500 hover:underline text-xs"
                onClick={() => eliminarMetadato(index)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        </div>
  </div>
  </div>
  </>
)}
