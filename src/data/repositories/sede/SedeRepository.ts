import { ApiResponse } from "../../../core/domain/dtos/common/ApiResponse";
import { CreateSedeRequest } from "../../../core/domain/dtos/sede/CreateSedeRequest";
import { SedeDto } from "../../../core/domain/dtos/sede/SedeDto";
import { UpdateSedeRequest } from "../../../core/domain/dtos/sede/UpdateSedeRequest";
import { SedeRepository } from "../../../core/usecases/sede/GetListSedesUseCase";
import { SedeApi } from "../../../infrastructure/api/SedeApi";

export class SedeRepositoryImpl implements SedeRepository {
  constructor(private api: SedeApi) {}

  async getList(codigo: number): Promise<SedeDto[]>{
    return await this.api.getList(codigo);
  }

  async create(data: CreateSedeRequest): Promise<ApiResponse<SedeDto>>{
    return await this.api.create(data);
  }

  async update(data: UpdateSedeRequest): Promise<ApiResponse<SedeDto>>{
    return await this.api.update(data);
  }
}