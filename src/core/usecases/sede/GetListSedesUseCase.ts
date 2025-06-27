import { SedeDto } from "../../domain/dtos/sede/SedeDto";

export interface SedeRepository {
  getList(codigo: number): Promise<SedeDto[]>;
}

export class GetListSedesUseCase {
  constructor(private sedeRepo: SedeRepository) {}

  async execute(codigo: number): Promise<SedeDto[]> {
    return await this.sedeRepo.getList(codigo);
  }
}