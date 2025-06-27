import { ApiResponse } from "../../domain/dtos/common/ApiResponse";
import { CreateEmpresaRequest } from "../../domain/dtos/empresa/CreateEmpresaRequest";
import { EmpresaDto } from "../../domain/dtos/empresa/EmpresaDto";

export interface EmpresaRepository {
  create(data: CreateEmpresaRequest): Promise<ApiResponse<EmpresaDto>>;
}

export class CreateEmpresaUseCase {
  constructor(private empresaRepo: EmpresaRepository) {}

  async execute(data: CreateEmpresaRequest): Promise<ApiResponse<EmpresaDto>> {
    return await this.empresaRepo.create(data);
  }
}