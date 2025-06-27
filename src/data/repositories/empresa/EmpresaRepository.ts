import { ApiResponse } from "../../../core/domain/dtos/common/ApiResponse";
import { CreateEmpresaRequest } from "../../../core/domain/dtos/empresa/CreateEmpresaRequest";
import { EmpresaDto } from "../../../core/domain/dtos/empresa/EmpresaDto";
import { UpdateEmpresaRequest } from "../../../core/domain/dtos/empresa/UpdateEmpresaRequest";
import { UploadLogoEmpresaRequest } from "../../../core/domain/dtos/empresa/UploadLogoEmpresaRequest";
import { EmpresaRepository } from "../../../core/usecases/empresa/GetEmpresabyCodigoUseCase";
import { EmpresaApi } from "../../../infrastructure/api/EmpresaApi";

export class EmpresaRepositoryImpl implements EmpresaRepository {
  constructor(private api: EmpresaApi) {}

  async getEmpresaByCodigo(codigo: string): Promise<EmpresaDto>{
    return await this.api.getEmpresaByCodigo(codigo);
  }

  async create(data: CreateEmpresaRequest): Promise<ApiResponse<EmpresaDto>>{
    return await this.api.create(data);
  }

  async uploadLogo(data: UploadLogoEmpresaRequest): Promise<ApiResponse<EmpresaDto>>{
    return await this.api.uploadLogo(data);
  }

  async update(data: UpdateEmpresaRequest): Promise<ApiResponse<EmpresaDto>>{
    return await this.api.update(data);
  }
}