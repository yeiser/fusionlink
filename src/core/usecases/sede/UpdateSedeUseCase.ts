import { ApiResponse } from "../../domain/dtos/common/ApiResponse";
import { SedeDto } from "../../domain/dtos/sede/SedeDto";
import { UpdateSedeRequest } from "../../domain/dtos/sede/UpdateSedeRequest";

export interface SedeRepository {
  update(data: UpdateSedeRequest): Promise<ApiResponse<SedeDto>>;
}

export class UpdateSedeUseCase {
  constructor(private sedeRepo: SedeRepository) {}

  async execute(data: UpdateSedeRequest): Promise<ApiResponse<SedeDto>> {
    return await this.sedeRepo.update(data);
  }
}