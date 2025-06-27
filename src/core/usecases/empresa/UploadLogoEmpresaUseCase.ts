import { ApiResponse } from "../../domain/dtos/common/ApiResponse";
import { EmpresaDto } from "../../domain/dtos/empresa/EmpresaDto";
import { UploadLogoEmpresaRequest } from "../../domain/dtos/empresa/UploadLogoEmpresaRequest";

export interface EmpresaRepository {
  uploadLogo(data: UploadLogoEmpresaRequest): Promise<ApiResponse<EmpresaDto>>;
}

export class UploadLogoEmpresaUseCase {
  constructor(private empresaRepo: EmpresaRepository) {}

  async execute(data: UploadLogoEmpresaRequest): Promise<ApiResponse<EmpresaDto>> {
    return await this.empresaRepo.uploadLogo(data);
  }
}