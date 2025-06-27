import { PlanDto } from "../../../core/domain/dtos/plan/PlanDto";
import { PlanRepository } from "../../../core/usecases/plan/GetListPlanesUseCase";
import { PlanesApi } from "../../../infrastructure/api/PlanesApi";

export class PlanRepositoryImpl implements PlanRepository {
  constructor(private api: PlanesApi) {}

  async getList(): Promise<PlanDto[]>{
    return await this.api.getList();
  }
}