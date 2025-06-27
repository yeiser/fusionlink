import { PlanDto } from "../../domain/dtos/plan/PlanDto";

export interface PlanRepository {
  getList(): Promise<PlanDto[]>;
}

export class GetListPlanesUseCase {
  constructor(private planRepo: PlanRepository) {}

  async execute(): Promise<PlanDto[]> {
    return await this.planRepo.getList();
  }
}