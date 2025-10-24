
import { env } from "../../config/env";
import { ForgotPasswordRequest } from "../../core/domain/dtos/auth/ForgotPasswordRequest";
import { RegisterRequest } from "../../core/domain/dtos/auth/RegisterRequest";
import { ResetPasswordRequest } from "../../core/domain/dtos/auth/ResetPasswordRequest";
import { UserDto } from "../../core/domain/dtos/auth/UserDto";
import { ValidateAuth2FaRequest } from "../../core/domain/dtos/auth/ValidateAuth2FaRequest";
import { ApiResponse } from "../../core/domain/dtos/common/ApiResponse";
import { LoginCredentials } from "../../core/usecases/auth/LoginUseCase";

export class AuthApi {
  async login(data: LoginCredentials): Promise<UserDto> {
    const response = await fetch(`${env.apiBaseUrl}/Usuarios/LoginUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<UserDto> = await response.json();

    if (response.status !== 500) {
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }else if(response.status === 500){
      console.log(result.message || "Ha ocurrido un error en el servidor");
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }

    return result.data;
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<any>> {
    const response = await fetch(`${env.apiBaseUrl}/Usuarios/SendCodeForgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<any> = await response.json();

    if (response.status !== 500) {
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }else if(response.status === 500){
      console.log(result.message || "Ha ocurrido un error en el servidor");
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }

    return result;
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<any>> {
    const response = await fetch(`${env.apiBaseUrl}/Usuarios/ResetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<any> = await response.json();

    if (response.status !== 500) {
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }else if(response.status === 500){
      console.log(result.message || "Ha ocurrido un error en el servidor");
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }

    return result;
  }

  async validateAuth2Fa(data: ValidateAuth2FaRequest): Promise<ApiResponse<any>> {
    const response = await fetch(`${env.apiBaseUrl}/Usuarios/ValidateAuth2FA`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<any> = await response.json();

    if (response.status !== 500) {
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }else if(response.status === 500){
      console.log(result.message || "Ha ocurrido un error en el servidor");
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }
    return result;
  }

  async register(data: RegisterRequest): Promise<ApiResponse<any>> {
    const response = await fetch(`${env.apiBaseUrl}/Usuarios/Register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<any> = await response.json();

    if (response.status !== 500) {
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }else if(response.status === 500){
      console.log(result.message || "Ha ocurrido un error en el servidor");
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }
    return result;
  }

  async activateAccount(code: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${env.apiBaseUrl}/Usuarios/ActivateAccount/${code}`, {
      method: "GET"
    });

    const result: ApiResponse<any> = await response.json();

    if (response.status !== 500) {
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }else if(response.status === 500){
      console.log(result.message || "Ha ocurrido un error en el servidor");
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }
    return result;
  }
}