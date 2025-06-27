import { ForgotPasswordRequest } from "../../domain/dtos/auth/ForgotPasswordRequest";
import { ApiResponse } from "../../domain/dtos/common/ApiResponse";

export interface AuthRepository {
  forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<any>>;
}

export class ForgotPasswordUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(data: ForgotPasswordRequest): Promise<ApiResponse<any>> {
    return await this.authRepo.forgotPassword(data);
  }
}