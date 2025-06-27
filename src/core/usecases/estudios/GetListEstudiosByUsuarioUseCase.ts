import { PageResponse } from "../../domain/dtos/common/PageResponse";
import { EstudioDto } from "../../domain/dtos/estudios/EstudioDto";

export interface EstudioRepository {
  getListByUsuario(page: number, search: string): Promise<PageResponse<EstudioDto>>;
}

export class GetListEstudiosByUsuarioUseCase {
  constructor(private estudioRepo: EstudioRepository) {}

  async execute(page: number, search: string): Promise<PageResponse<EstudioDto>> {
    return await this.estudioRepo.getListByUsuario(page, search);
  }
}