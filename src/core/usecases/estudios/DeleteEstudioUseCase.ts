import { ApiResponse } from "../../domain/dtos/common/ApiResponse";

export interface EstudioRepository {
  delete(id: number): Promise<ApiResponse<null>>;
}

export class DeleteEstudioUseCase {
  constructor(private estudioRepo: EstudioRepository) {}

  async execute(id: number): Promise<ApiResponse<null>> {
    return await this.estudioRepo.delete(id);
  }
}