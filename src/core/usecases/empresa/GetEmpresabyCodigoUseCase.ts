import { EmpresaDto } from "../../domain/dtos/empresa/EmpresaDto";

export interface EmpresaRepository {
  getEmpresaByCodigo(codigo: string): Promise<EmpresaDto>;
}

export class GetEmpresaByCodigoUseCase {
  constructor(private empresaRepo: EmpresaRepository) {}

  async execute(codigo: string): Promise<EmpresaDto> {
    return await this.empresaRepo.getEmpresaByCodigo(codigo);
  }
}