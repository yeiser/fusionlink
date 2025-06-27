import { RegisterRequest } from "../../domain/dtos/auth/RegisterRequest";
import { ApiResponse } from "../../domain/dtos/common/ApiResponse";

export interface AuthRepository {
  register(data: RegisterRequest): Promise<ApiResponse<any>>;
}

export class RegisterUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(data: RegisterRequest): Promise<ApiResponse<any>> {
    return await this.authRepo.register(data);
  }
}