
import { ResetPasswordRequest } from "../../domain/dtos/auth/ResetPasswordRequest";
import { ApiResponse } from "../../domain/dtos/common/ApiResponse";

export interface AuthRepository {
  resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<any>>;
}

export class ResetPasswordUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(data: ResetPasswordRequest): Promise<ApiResponse<any>> {
    return await this.authRepo.resetPassword(data);
  }
}