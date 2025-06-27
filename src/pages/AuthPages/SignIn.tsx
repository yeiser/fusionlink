import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { AuthApi } from "../../infrastructure/api/AuthApi";
import { AuthRepositoryImpl } from "../../data/repositories/auth/AuthRepository";
import { LoginUseCase } from "../../core/usecases/auth/LoginUseCase";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router";
import { GetEmpresaByCodigoUseCase } from "../../core/usecases/empresa/GetEmpresabyCodigoUseCase";
import { EmpresaApi } from "../../infrastructure/api/EmpresaApi";
import { EmpresaRepositoryImpl } from "../../data/repositories/empresa/EmpresaRepository";

export default function SignIn() {
  const { codigo } = useParams();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, login, setCompany, empresa } = useAuth();

  useEffect(() => {
    const api = new EmpresaApi();
    const repo = new EmpresaRepositoryImpl(api);
    const getEmpresaByCodigoUseCase = new GetEmpresaByCodigoUseCase(repo);

    if(codigo){
      const loadEmpresa = async () => {
        const empresa = await getEmpresaByCodigoUseCase.execute(codigo);
        setCompany(empresa);
      }

      loadEmpresa();
    }

    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    const api = new AuthApi();
    const repo = new AuthRepositoryImpl(api);
    const loginUseCase = new LoginUseCase(repo);
    

    try {
      const user = await loginUseCase.execute({ email, password });
      login(user, rememberMe);
      navigate("/home")
    } catch (err) {
      setLoginError((err as Error).message || "Login fallido");
    }
  };
  return (
    <>
      <PageMeta
        title={empresa ? empresa.razonSocial : "FusionLink"}
        description=""
      />
      <AuthLayout>
        <SignInForm onLogin={handleLogin} errorMessage={loginError}/>
      </AuthLayout>
    </>
  );
}
