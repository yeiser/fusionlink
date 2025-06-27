import { ApiResponse } from "../../domain/dtos/common/ApiResponse";
import { CreateEstudioRequest } from "../../domain/dtos/estudios/CreateEstudioRequest";
import { EstudioDto } from "../../domain/dtos/estudios/EstudioDto";

export interface EstudioRepository {
  create(data: CreateEstudioRequest): Promise<ApiResponse<EstudioDto>>;
}

export class CreateEstudioUseCase {
  constructor(private estudioRepo: EstudioRepository) {}

  async execute(data: CreateEstudioRequest): Promise<ApiResponse<EstudioDto>> {
    return await this.estudioRepo.create(data);
  }
}