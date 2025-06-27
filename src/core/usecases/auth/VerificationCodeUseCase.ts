import { VerificationCodeRequest } from "../../domain/dtos/auth/VerificationCodeRequest";
import { ApiResponse } from "../../domain/dtos/common/ApiResponse";

export interface AuthRepository {
  verificationCode(data: VerificationCodeRequest): Promise<ApiResponse<any>>;
}

export class VerificationCodeUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(data: VerificationCodeRequest): Promise<ApiResponse<any>> {
    return await this.authRepo.verificationCode(data);
  }
}