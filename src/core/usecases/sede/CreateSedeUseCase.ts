import { ApiResponse } from "../../domain/dtos/common/ApiResponse";
import { CreateSedeRequest } from "../../domain/dtos/sede/CreateSedeRequest";
import { SedeDto } from "../../domain/dtos/sede/SedeDto";

export interface SedeRepository {
  create(data: CreateSedeRequest): Promise<ApiResponse<SedeDto>>;
}

export class CreateSedeUseCase {
  constructor(private sedeRepo: SedeRepository) {}

  async execute(data: CreateSedeRequest): Promise<ApiResponse<SedeDto>> {
    return await this.sedeRepo.create(data);
  }
}