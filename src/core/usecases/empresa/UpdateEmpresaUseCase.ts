import { ApiResponse } from "../../domain/dtos/common/ApiResponse";
import { EmpresaDto } from "../../domain/dtos/empresa/EmpresaDto";
import { UpdateEmpresaRequest } from "../../domain/dtos/empresa/UpdateEmpresaRequest";

export interface EmpresaRepository {
  update(data: UpdateEmpresaRequest): Promise<ApiResponse<EmpresaDto>>;
}

export class UpdateEmpresaUseCase {
  constructor(private empresaRepo: EmpresaRepository) {}

  async execute(data: UpdateEmpresaRequest): Promise<ApiResponse<EmpresaDto>> {
    return await this.empresaRepo.update(data);
  }
}