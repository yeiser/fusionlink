import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import { useState } from "react";
import { AuthApi } from "../../infrastructure/api/AuthApi";
import { AuthRepositoryImpl } from "../../data/repositories/auth/AuthRepository";
import { RegisterUseCase } from "../../core/usecases/auth/RegisterUseCase";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {empresa} = useAuth();

  const handleRegister = async (tipoIdentificacion: string, identificacion: string, email: string, nombres: string, apellidos: string, clave: string, telefono: string) => {
      const api = new AuthApi();
      const repo = new AuthRepositoryImpl(api);
      const registerUseCase = new RegisterUseCase(repo);
  
      try {
        const response = await registerUseCase.execute({ tipoIdentificacion, identificacion, email, nombres, apellidos, clave, telefono });
        if(response.success){
          navigate("/status", {
            state: {
              type: "success",
              message: `${response.message}, hemos enviado un correo electrónico a ${email} con un código para la activación de tu cuenta`,
              redirectUrl: "/activate-account",
              textBtn: "Activar cuenta"
            }
          });
        }
      } catch (err: any) {
        setRegisterError((err as Error).message);
      }
    };
  
  return (
    <>
      <PageMeta
        title={empresa ? empresa.razonSocial : "FusionLink"}
        description=""
      />
      <AuthLayout>
        <SignUpForm onRegister={handleRegister} errorMessage={registerError}/>
      </AuthLayout>
    </>
  );
}
