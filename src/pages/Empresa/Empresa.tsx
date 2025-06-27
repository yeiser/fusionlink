import EmptyState from "../../components/common/EmptyState";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import EmpresaMetaCard from "../../components/empresa/EmpresaMetaCard";
import { useAuth } from "../../context/AuthContext";
import CreateEmpresaForm from "../../components/empresa/CreateEmpresaForm";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import { useState } from "react";
import { EmpresaApi } from "../../infrastructure/api/EmpresaApi";
import { EmpresaRepositoryImpl } from "../../data/repositories/empresa/EmpresaRepository";
import { CreateEmpresaUseCase } from "../../core/usecases/empresa/CreateEmpresaUseCase";
import { AttachBase64Dto } from "../../core/domain/dtos/common/AttachBase64Dto";
import { useNavigate } from "react-router";
import EmpresaInfoCard from "../../components/empresa/EmpresaInfoCard";
import SedesEmpresaCard from "../../components/empresa/SedesEmpresaCard";


export default function Empresa() {
  
  const { isOpen, openModal, closeModal} = useModal();
  let { user, refreshUser, setCompany, empresa } = useAuth();
  const [ createError, setCreateError ] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreate = async (nit: string, razonSocial: string, direccion: string, telefono: string, email: string,  sitioWeb: string, logo: AttachBase64Dto | null, departamentoId: number | null, municipioId: number | null ) =>{
    const api = new EmpresaApi();
    const repo = new EmpresaRepositoryImpl(api);
    const createEmpresaUseCase = new CreateEmpresaUseCase(repo);

    try {
    const response = await createEmpresaUseCase.execute({ nit, razonSocial, direccion, telefono, email, sitioWeb, logo, departamentoId, municipioId });
    if(response.success) {
        if (user && !user.empresa) {
            user.empresa = response.data;
            refreshUser(user);
            setCompany(response.data);
        }

        navigate("/status", {
            state: {
                type: "success",
                message: `${response.message}`,
                redirectUrl: "/empresa",
                textBtn: "Continuar"
            }
        });
    }
    } catch (err) {
        setCreateError("Ocurrió un error al crear la empresa");
        console.log((err as Error).message);
    }
  }
  return (
    <>
      <PageMeta
        title={empresa?.razonSocial ?? "FusionLink"}
      />
      <PageBreadcrumb pageTitle="Empresa" />
      {
        !empresa ? (
            <EmptyState title="Oop's" description="Aún no has creado una empresa, haz clic en el botón 'Crear empresa' para crearla." textButton="Crear empresa" onCreate={openModal}/>
        ) : (
            <>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                  <div className="space-y-6">
                    <EmpresaMetaCard />
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <EmpresaInfoCard />
                      </div>
                      <div className="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
                        <SedesEmpresaCard />
                      </div>
                    </div>
                  </div>
                </div>
            </>
        )
      }
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <CreateEmpresaForm onCreate={handleCreate} errorMessage={createError}/>
      </Modal>
    </>
  );
}
