import { useEffect, useState } from "react";
import { GetListSedesUseCase } from "../../core/usecases/sede/GetListSedesUseCase";
import { useAuth } from "../../context/AuthContext";
import { SedeApi } from "../../infrastructure/api/SedeApi";
import { SedeRepositoryImpl } from "../../data/repositories/sede/SedeRepository";
import { SedeDto } from "../../core/domain/dtos/sede/SedeDto";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { DropdownActions } from "../common/DropdownActions";
import { GetUbicacionUseCase } from "../../core/usecases/ubicacion/GetUbicacionUseCase";
import { useMultiModal } from "../../hooks/useMultiModal";
import { Modal } from "../ui/modal";
import CreateSedeForm from "../sede/CreateSedeForm";
import SedeDetails from "../sede/SedeDetails";
import { CreateSedeUseCase } from "../../core/usecases/sede/CreateSedeUseCase";
import EditSedeForm from "../sede/EditSedeForm";
import { UpdateSedeUseCase } from "../../core/usecases/sede/UpdateSedeUseCase";
import Loader from "../common/Loader";

export default function SedesEmpresaCard() {
  const { modalType, isOpen, openModal, closeModal } = useMultiModal<"crear" | "editar" | "detalles" | null>();
  const {user, empresa} = useAuth();
  const [sedes, setSedes] = useState<SedeDto[]>([]);
  const [selectedSede, setSelectedSede] = useState<SedeDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorLoad, setErrorLoad] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {departamentos, municipios, setSelectedDepartamento} = GetUbicacionUseCase();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [departamentoId, setDepartamentoId] = useState<number | null>(null);
  const [municipioId, setMunicipioId] = useState<number | null>(null);

  const handleSave = async () => {
    if(!validate()) return;

    const api = new SedeApi();
        const repo = new SedeRepositoryImpl(api);
        const createSedeUseCase = new CreateSedeUseCase(repo);

        try {
            setLoading(true);
            if (!empresa?.id) {
                setErrorMessage("No se encontró la información de la empresa.");
                return;
            }
            const response = await createSedeUseCase.execute({ empresaId: empresa?.id, nombre: nombre, direccion: direccion, telefono: telefono, departamentoId: departamentoId, municipioId: municipioId });
            if(response.success) {
                closeModal();
                resetForm();
                cargarSedes();
            }
        } catch (err) {
            setErrorMessage("Ocurrió un error al crear la empresa");
            console.log((err as Error).message);
        }finally{
            setLoading(false);
        }
  };

  const resetForm = () => {
    setNombre("");
    setDireccion("");
    setTelefono("");
    setDepartamentoId(null);
    setMunicipioId(null);
    setErrorMessage(null);
  }

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
    cargarSedes();
  }, []);

  const cargarSedes = async () => {
        try{
            setLoading(true);
            const api = new SedeApi();
            const repo = new SedeRepositoryImpl(api);
            const getListSedeUseCase = new GetListSedesUseCase(repo);
            if(user?.empresa){
                const response = await getListSedeUseCase.execute(user.empresa.id);
                if(response){
                    setSedes(response);
                }
            }
        }
        catch(err){
            setErrorLoad("Ocurrió un error al cargar las sedes");
            console.log((err as Error).message);
        }finally{
            setLoading(false);
        }
    };

  const handleDetails = (type: "editar" | "detalles", sede: SedeDto) => {
    setSelectedSede(sede);
    setErrorMessage(null);
    openModal(type);
  };

  const handleUpdate = async (sedeEditado: SedeDto) => {
    try{
            setLoading(true);
            const api = new SedeApi();
            const repo = new SedeRepositoryImpl(api);
            const updateSedeUseCase = new UpdateSedeUseCase(repo);

            const response = await updateSedeUseCase.execute(sedeEditado);
            if(response.success){
                closeModal();
                cargarSedes();
            }
        }
        catch(err){
            setErrorLoad("Ocurrió un error al cargar las sedes");
            console.log((err as Error).message);
        }finally{
            setLoading(false);
        }
  };

  return (
    <>
    <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Sedes</h3>
        </div>
        <div className="relative">
            <div>
                <button
                    onClick={() => {openModal("crear"); resetForm();}}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                    Agregar sede
                </button>
            </div>
        </div>
    </div>
    <div className="max-w-full overflow-x-auto custom-scrollbar h-full">
        {
            loading ? (
                <Loader message="Cargando sedes..."/>
            ) : errorLoad ? (
                <p className="mb-6 text-sm text-center font-semibold text-gray-800 dark:text-white/90">{errorLoad}</p>
            ) : (
                <Table>
                {/* Table Header */}
                <TableHeader className="border-gray-100 border-y bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                    <TableRow>
                    <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        Nombre
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        Municipio
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        {""}
                    </TableCell>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {sedes.map((sede) => {
                      const actions = [
                        {
                          label: "Detalles",
                          onClick: () => handleDetails("detalles", sede)
                        },
                        {
                          label: "Editar",
                          onClick: () => handleDetails("editar", sede)
                        }
                      ];

                      return(
                        <TableRow key={sede.id}>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div className="flex items-center">
                                  <div className="flex items-center gap-3">
                                      <div>
                                      <span className="text-theme-sm mb-0.5 block font-medium text-gray-700 dark:text-gray-400">
                                          {sede.nombre}
                                      </span>
                                      <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                                          {sede.direccion}
                                      </span>
                                      </div>
                                  </div>
                              </div>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {sede.municipio}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div className="flex items-center justify-center">
                                  <DropdownActions actions={actions}/>
                              </div>
                          </TableCell>
                      </TableRow>
                      )})}
                </TableBody>
                </Table>
            )
        }
    </div>
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        {modalType === "crear" && (
          <CreateSedeForm
            nombre={nombre}
            direccion={direccion}
            telefono={telefono}
            departamentoId={departamentoId}
            municipioId={municipioId}
            departamentos={departamentos}
            municipios={municipios}
            errorMessage={errorMessage}
            loading={loading}
            setNombre={setNombre}
            setDireccion={setDireccion}
            setTelefono={setTelefono}
            setDepartamentoId={setDepartamentoId}
            setMunicipioId={setMunicipioId}
            setSelectedDepartamento={setSelectedDepartamento}
            onClose={closeModal}
            onSave={handleSave}
            setErrorMessage={setErrorMessage}
            setloading={setLoading}
          />
        )}
        {modalType === "editar" && selectedSede &&(
          <EditSedeForm
            sede={selectedSede}
            departamentos={departamentos}
            municipios={municipios}
            errorMessage={errorMessage}
            loading={loading}
            setSelectedDepartamento={setSelectedDepartamento}
            onClose={closeModal}
            onSave={handleUpdate}
            setErrorMessage={setErrorMessage}
            setLoading={setLoading}
          />
        )}
        {modalType === "detalles" && selectedSede && (
          <SedeDetails sede={selectedSede} onClose={closeModal} />
        )}
    </Modal>
    </>
  );
}
