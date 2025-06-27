import { ApiResponse } from "../../../core/domain/dtos/common/ApiResponse";
import { PageResponse } from "../../../core/domain/dtos/common/PageResponse";
import { CreateEstudioRequest } from "../../../core/domain/dtos/estudios/CreateEstudioRequest";
import { EstudioDto } from "../../../core/domain/dtos/estudios/EstudioDto";
import { EstudioRepository } from "../../../core/usecases/estudios/GetListEstudiosByEmpresaUseCase";
import { EstudiosApi } from "../../../infrastructure/api/EstudiosApi";

export class EstudioRepositoryImpl implements EstudioRepository {
  constructor(private api: EstudiosApi) {}

  async getListByEmpresa(page:number, search: string): Promise<PageResponse<EstudioDto>>{
    return await this.api.getListByEmpresa(page, search);
  }

  async getListByUsuario(page: number, search: string): Promise<PageResponse<EstudioDto>>{
    return await this.api.getListByUsuario(page, search);
  }

  async create(data: CreateEstudioRequest): Promise<ApiResponse<EstudioDto>>{
    return await this.api.create(data);
  }

  async delete(id: number): Promise<ApiResponse<null>>{
    return await this.api.delete(id);
  }
}