import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import Badge from "../ui/badge/Badge";
import { Link } from "react-router";
import DropzoneComponent from "../form/form-elements/DropZone";
import { useState } from "react";
import { EmpresaApi } from "../../infrastructure/api/EmpresaApi";
import { EmpresaRepositoryImpl } from "../../data/repositories/empresa/EmpresaRepository";
import { UploadLogoEmpresaUseCase } from "../../core/usecases/empresa/UploadLogoEmpresaUseCase";
import { toBase64 } from "../../shared/utils/toBase64";
import { AttachBase64Dto } from "../../core/domain/dtos/common/AttachBase64Dto";
import { ErrorAlert } from "../common/ErrorAlert";

export default function EmpresaMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { setCompany, empresa } = useAuth();
  const [loading, setLoading] = useState(false);
  const [idEmpresa, setIdEmpresa] = useState<number | null>(null);
  const [fileDto, setFileDto] = useState<AttachBase64Dto | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async (empresaId: number, logo: AttachBase64Dto) => {
    if(!fileDto) {
      setErrorMessage("Debe seleccionar una imagen.");
      return;
    };

    setLoading(true);
    const api = new EmpresaApi();
    const repo = new EmpresaRepositoryImpl(api);
    const uploadLogoEmpresaUseCase = new UploadLogoEmpresaUseCase(repo);

    try{
      const response = await uploadLogoEmpresaUseCase.execute({empresaId, logo});
      if(response.success){
        setCompany(response.data);
        closeModal();
        setFileDto(null);
      }
    }catch(err){
      setErrorMessage((err as Error).message || "Ocurrió un error al registrarse");
    }finally{
      setLoading(false);
    }
  };

  const handleFileChange = async (file: File) => {

      const base64 = await toBase64(file);
      const dto: AttachBase64Dto = {
          base64: base64.split(',')[1],
          fileName: file.name,
          contentType: file.type
      }
      if(empresa?.id !== undefined){
        setIdEmpresa(empresa.id);
      }
      setFileDto(dto);
      setErrorMessage("");
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Link to={""}
                onClick={openModal}>
                <img src={empresa?.logo} alt="logo" className="w-full h-full"/>
              </Link>
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {empresa?.razonSocial}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  NIT
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {empresa?.nit}
                </p>
              </div>
            </div>
          </div>
          <Badge variant="solid" color="success">
            {empresa?.estado.toUpperCase()}
          </Badge>{" "}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Actualizar logo
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Actualizar el logo de la empresa
            </p>
          </div>
          {errorMessage && <ErrorAlert message={errorMessage}/>}
          <DropzoneComponent onFileSelected={handleFileChange}/>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Salir
              </Button>
              <Button size="sm"
                  type="button"
                  className={`flex items-center justify-center gap-2 p-2 rounded text-white h-10 ${
                    loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => {
                    if(idEmpresa && fileDto){
                      handleSave(idEmpresa, fileDto)
                    } else {
                      setErrorMessage("Debe seleccionar una imagen.");
                    }
                  }}
                  disabled={loading}>
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Guardar"
                  )}
              </Button>
            </div>
        </div>
        
      </Modal>
    </>
  );
}
