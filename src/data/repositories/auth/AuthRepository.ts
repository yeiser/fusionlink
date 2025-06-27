import { ForgotPasswordRequest } from "../../../core/domain/dtos/auth/ForgotPasswordRequest";
import { RegisterRequest } from "../../../core/domain/dtos/auth/RegisterRequest";
import { ResetPasswordRequest } from "../../../core/domain/dtos/auth/ResetPasswordRequest";
import { UserDto } from "../../../core/domain/dtos/auth/UserDto";
import { VerificationCodeRequest } from "../../../core/domain/dtos/auth/VerificationCodeRequest";
import { ApiResponse } from "../../../core/domain/dtos/common/ApiResponse";
import { AuthRepository, LoginCredentials } from "../../../core/usecases/auth/LoginUseCase";
import { AuthApi } from "../../../infrastructure/api/AuthApi";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private api: AuthApi) {}

  async login(credentials: LoginCredentials): Promise<UserDto> {
    return await this.api.login(credentials);
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<any>>{
    return await this.api.forgotPassword(data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<any>>{
    return await this.api.resetPassword(data);
  }

  async verificationCode(data: VerificationCodeRequest): Promise<ApiResponse<any>>{
    return await this.api.validateAuth2Fa(data);
  }

  async register(data: RegisterRequest): Promise<ApiResponse<any>>{
    return await this.api.register(data);
  }

  async activateAccount(code: string): Promise<ApiResponse<any>>{
    return await this.api.activateAccount(code);
  }
}