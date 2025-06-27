import PageMeta from "../../components/common/PageMeta";
import { AuthApi } from "../../infrastructure/api/AuthApi";
import { AuthRepositoryImpl } from "../../data/repositories/auth/AuthRepository";
import { useState } from "react";
import { ForgotPasswordUseCase } from "../../core/usecases/auth/ForgotPasswordUseCase";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import AuthLayout from "./AuthPageLayout";
import { VerificationCodeUseCase } from "../../core/usecases/auth/VerificationCodeUseCase";
import { useNavigate } from "react-router";
import VerificationCodeForm from "../../components/auth/VerificationCodeForm";
import { ResetPasswordUseCase } from "../../core/usecases/auth/ResetPasswordUseCase";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPassword() {

  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(null);
  const [verificationCodeError, setVerificationCodeError] = useState<string | null>(null);
  const [stepForm, setStepForm] = useState("request");
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const { empresa } = useAuth();

  const api = new AuthApi();
  const repo = new AuthRepositoryImpl(api);

  const handleForgotPassword = async (email: string) => {
    
    const forgotPasswordUseCase = new ForgotPasswordUseCase(repo);
    
    try {
      const response = await forgotPasswordUseCase.execute({ email });
      if(response.success){
        setEmail(email);
        setStepForm("validate");
      }
    } catch (err) {
      setForgotPasswordError((err as Error).message || "Ocurrió un error al realizar esta solicitud");
    }
  };

  const handleValidationCode = async (email:string, validationCode: string) => {
    const verificationCodeUseCase = new VerificationCodeUseCase(repo);
    try{
      const response = await verificationCodeUseCase.execute({ email, validationCode });
      if(response.success){
        setStepForm("reset");
      }
    }catch(err){
      setVerificationCodeError((err as Error).message || "Ocurrió un error al verificar el código");
    }
  }

  const handleResetPassword = async (email: string, password: string) => {
    const resetPasswordUseCase = new ResetPasswordUseCase(repo);
    try{
      const response = await resetPasswordUseCase.execute({ email, password});
      if(response.success){
        navigate("/status", {
          state: {
            type: "success",
            message: "Su contraseña se ha cambiado exitosamente.",
            redirectUrl: "/",
            textBtn: "Loguearme"
          }
        })
      }
    }catch(err){
      setResetPasswordError((err as Error).message || "Ocurrió un error al restablecer la contraseña");
    }
  }

  return (
    <>
      <PageMeta
        title={empresa ? empresa.razonSocial : "FusionLink"}
        description=""
      />
      <AuthLayout>
        { stepForm === "validate" ? (<VerificationCodeForm onVerificationCode={handleValidationCode} errorMessage={verificationCodeError} correo={email}/>)
          : stepForm === "reset" ? (<ResetPasswordForm onResetPassword={handleResetPassword} errorMessage={resetPasswordError} email={email}></ResetPasswordForm>)
          : (<ForgotPasswordForm onForgotPassword={handleForgotPassword} errorMessage={forgotPasswordError}/>)
        }
      </AuthLayout>
    </>
  );
}
