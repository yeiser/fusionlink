import { ApiResponse } from "../../domain/dtos/common/ApiResponse";

export interface AuthRepository {
  activateAccount(code: string): Promise<ApiResponse<any>>;
}

export class ActivateAccountUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(code: string): Promise<ApiResponse<any>> {
    return await this.authRepo.activateAccount(code);
  }
}