import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { EstudioDto } from "../../core/domain/dtos/estudios/EstudioDto";
import EmptyState from "../../components/common/EmptyState";
import { AttachBase64Dto } from "../../core/domain/dtos/common/AttachBase64Dto";
import CreateEstudioForm from "../../components/estudios/CreateEstudioForm";
import Loader from "../../components/common/Loader";
import { EstudiosApi } from "../../infrastructure/api/EstudiosApi";
import { EstudioRepositoryImpl } from "../../data/repositories/estudio/EstudioRepository";
import { GetListEstudiosByEmpresaUseCase } from "../../core/usecases/estudios/GetListEstudiosByEmpresaUseCase";
import { GetListEstudiosByUsuarioUseCase } from "../../core/usecases/estudios/GetListEstudiosByUsuarioUseCase";
import EstudiosList from "../../components/estudios/EstudiosList";
import { Metadatos } from "../../core/domain/dtos/common/Metadatos";
import { CreateEstudioUseCase } from "../../core/usecases/estudios/CreateEstudioUseCase";
import { PageResponse } from "../../core/domain/dtos/common/PageResponse";
import { DeleteEstudioUseCase } from "../../core/usecases/estudios/DeleteEstudioUseCase";
import ConfirmModal from "../../components/ui/modal/ConfirmModal";

export default function Estudios(){
    const {user, empresa} = useAuth();
    const [estudios, setEstudios] = useState<PageResponse<EstudioDto> | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});

    const[tipoIdentificacion, setTipoIdentificacion] = useState("");
    const[identificacion, setIdentificacion] = useState("");
    const[nombrePaciente, setNombrePaciente] = useState("");
    const[nombreEstudio, setNombreEstudio] = useState("");
    const[fechaEstudio, setFechaEstudio] = useState<Date | null>(null);
    const[fechaReporte, setFechaReporte] = useState<Date | null>(null);
    const[usuarioSubida, setUsuarioSubida] = useState("");
    const[fileDto, setFileDto] = useState<AttachBase64Dto | null>(null);
    const[metadatos, setMetadatos] = useState<Metadatos[]>([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[query, setQuery] = useState("");

    const handleOptions = async (type: "descargar" | "eliminar", estudio: EstudioDto) => {
        setErrorMessage(null);
        if(type === "descargar"){
            window.open(estudio.url, "_blank");
        }
        else if(type === "eliminar"){
            setConfirmAction(() => async () => {
                setShowConfirmModal(false);
                await deleteEstudio(estudio.id);
                cargarEstudios();
            });
            setShowConfirmModal(true);
        }
    };

    const cargarEstudios = async () => {
        try{
            setLoading(true);
            const api = new EstudiosApi();
            const repo = new EstudioRepositoryImpl(api);
            const getListEstudiosByEmpresaUseCase = new GetListEstudiosByEmpresaUseCase(repo);
            const getListEstudiosByUsuarioUseCase = new GetListEstudiosByUsuarioUseCase(repo);

            if(user?.empresa){
                const response = await getListEstudiosByEmpresaUseCase.execute(currentPage, query);
                if(response){
                    setEstudios(response);
                }
            }else{
                const response = await getListEstudiosByUsuarioUseCase.execute(currentPage, query);
                if(response){
                    setEstudios(response);
                }
            }
        }
        catch(err){
            console.log("Ocurrió un error al cargar los estudios clínicos");
            console.log((err as Error).message);
        }finally{
            setLoading(false);
        }
    }

    const deleteEstudio = async(id: number) => {
        try{
            setLoading(true);
            const api = new EstudiosApi();
            const repo = new EstudioRepositoryImpl(api);
            const deleteEstudioUseCase = new DeleteEstudioUseCase(repo);

            const response = await deleteEstudioUseCase.execute(id);
            if(response.success){
                cargarEstudios();
            }
        }
        catch(err){
            console.log("Ocurrió un error al cargar los estudios clínicos");
            console.log((err as Error).message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarEstudios();
    }, [currentPage, query]);

    const handleSave = async () => {
        if(!validate()) return;

        try{
            setLoading(true);
            const api = new EstudiosApi();
            const repo = new EstudioRepositoryImpl(api);
            const createEstudioUseCase = new CreateEstudioUseCase(repo);

            const response = await createEstudioUseCase.execute({
                identificacion: identificacion,
                tipoIdentificacion: tipoIdentificacion,
                nombrePaciente: nombrePaciente,
                nombreEstudio: nombreEstudio,
                fechaEstudio: fechaEstudio!,
                fechaReporte: fechaReporte,
                usuarioSubida: usuarioSubida,
                uploadFile: fileDto!,
                metadatos: metadatos});

            if(response.success){
                setCurrentPage(1);
                setQuery("");
                setMostrarFormulario(false);
                resetForm();
                cargarEstudios();
            }
        }
        catch(err){
            setErrorMessage("Ocurrió un error al cargar el archivo");
            console.log((err as Error).message);
        }finally{
            setLoading(false);
        }
    }

    const handleClose = () => {
        resetForm();
        setMostrarFormulario(false); 
        cargarEstudios();
    }

    const validate = () => {
        const today = new Date();
        today.setHours(0,0,0,0);
        fechaEstudio?.setHours(0,0,0,0);

        if(!fechaEstudio){
            setErrorMessage("El campo fecha del estudio es obligatorio.");
            return false;
        }
        if(fechaEstudio > today){
            setErrorMessage("El campo fecha del estudio no debe ser mayor a la fecha actual.");
            return false;
        }
        if(fechaReporte! > today){
            setErrorMessage("El campo fecha del reporte no debe ser mayor a la fecha actual.");
            return false;
        }
        if(!tipoIdentificacion.trim()){
            setErrorMessage("El campo tipo de identificación es obligatorio.");
            return false;
        }
        if(!identificacion.trim()){
            setErrorMessage("El campo identificación es obligatorio.");
            return false;
        }
        if(!nombrePaciente.trim()){
            setErrorMessage("El campo nombre del paciente es obligatorio.");
            return false;
        }
        if(!nombreEstudio.trim()){
            setErrorMessage("El campo nombre del estudio es obligatorio.");
            return false;
        }
        if(!usuarioSubida.trim()){
            setErrorMessage("El campo nombre del usuario es obligatorio.");
            return false;
        }
        if(!fileDto){
            setErrorMessage("Debe seleccionar un archivo.");
            return false;
        }

        setErrorMessage(null);
        return true;

    }

    const resetForm = () => {
        setFechaEstudio(null);
        setFechaReporte(null);
        setTipoIdentificacion("");
        setIdentificacion("");
        setNombrePaciente("");
        setNombreEstudio("");
        setUsuarioSubida("");
        setFileDto(null);
        setMetadatos([]);
    }
    

    return(
        <>
            <PageMeta title={empresa?.razonSocial ?? "FusionLink"}/>
            <PageBreadcrumb pageTitle="Estudios clínicos" />
            {
                mostrarFormulario ? (
                    <CreateEstudioForm
                        tipoIdentificacion={tipoIdentificacion}
                        identificacion={identificacion}
                        nombrePaciente={nombrePaciente}
                        nombreEstudio={nombreEstudio}
                        fechaEstudio={fechaEstudio}
                        fechaReporte={fechaReporte}
                        usuarioSubida={usuarioSubida}
                        fileDto={fileDto}
                        metadatos={metadatos}
                        errorMessage={errorMessage}
                        loading={loading}
                        setTipoIdentificacion={setTipoIdentificacion}
                        setIdentificacion={setIdentificacion}
                        setNombrePaciente={setNombrePaciente}
                        setNombreEstudio={setNombreEstudio}
                        setFechaEstudio={setFechaEstudio}
                        setFechaReporte={setFechaReporte}
                        setUsuarioSubida={setUsuarioSubida}
                        setFileDto={setFileDto}
                        setMetadatos={setMetadatos}
                        onClose={handleClose}
                        onSave={handleSave}
                        setErrorMessage={setErrorMessage}
                        setloading={setLoading}
                        />
                ) : (
                <>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                        {
                            loading ? (
                                <Loader message="Cargando estudios clínicos..."/>
                            ): estudios?.data.length === 0 && user?.empresa ? (
                                <EmptyState title="Lo sentimos!" 
                                    description="No se encontraron estudios reportados." 
                                    textButton="Cargar estudio" 
                                    onCreate={() => setMostrarFormulario(true)}
                                    onClose={() => setQuery("")}
                                    textClose="Continuar"/>
                            ): estudios?.data.length === 0 && !user?.empresa ? (
                                <EmptyState title="Lo sentimos!" 
                                    description="No se encontraron estudios reportados."
                                    onClose={() => setQuery("")}
                                    textClose="Continuar"/>
                            ) : (
                                !mostrarFormulario && (
                                    <EstudiosList 
                                        estudios={estudios} 
                                        handleOptions={handleOptions} 
                                        onAgregar={() => setMostrarFormulario(true)}
                                        onPageChange={(page, search) => {
                                            setCurrentPage(page);
                                            setQuery(search);
                                        }}
                                        searchValue={query}
                                    />
                                )
                            )
                        }
                    </div>
                </>)
                
            }
            <ConfirmModal
                isOpen={showConfirmModal}
                title="Confirmación"
                message="Esta acción eliminará el estudio clínico seleccionado. ¿Estás seguro que deseas eliminarlo?"
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={confirmAction}
            />
        </>
    );
}