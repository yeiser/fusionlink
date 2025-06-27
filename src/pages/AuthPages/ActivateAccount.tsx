import PageMeta from "../../components/common/PageMeta";
import { AuthApi } from "../../infrastructure/api/AuthApi";
import { AuthRepositoryImpl } from "../../data/repositories/auth/AuthRepository";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ActivateAccountUseCase } from "../../core/usecases/auth/ActivateAccountUseCase";
import ActivateAccountForm from "../../components/auth/ActivateAccountForm";
import GridShape from "../../components/common/GridShape";
import { useAuth } from "../../context/AuthContext";

export default function ActivateAccount() {

  const { codigo } = useParams<{ codigo: string }>();      
  const [activateAccountError, setActivateAccountError] = useState<string | null>(null);
  const navigate = useNavigate()
  const { empresa } = useAuth();

  useEffect(() => {
    if(codigo){
        handleActivateAccount(codigo);
    }
  }, [codigo])

  const handleActivateAccount = async (validationCode: string) => {

    const api = new AuthApi();
    const repo = new AuthRepositoryImpl(api);
    const activateAccountUseCase = new ActivateAccountUseCase(repo);
    
    try{
      const response = await activateAccountUseCase.execute(validationCode);
      if(response.success){
        navigate("/status", {
            state: {
                type: "success",
                message: response.message,
                redirectUrl: "/",
                textBtn: "Ingresar"
            }
        })
      }
    }catch(err){
      setActivateAccountError((err as Error).message || "Ocurrió un error al verificar el código");
    }
  }

  return (
    <>
      <PageMeta
        title={empresa ? empresa.razonSocial : "FusionLink"}
        description=""
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <ActivateAccountForm onActivateAccount={handleActivateAccount} errorMessage={activateAccountError}/>
      </div>
    </>
  );
}
