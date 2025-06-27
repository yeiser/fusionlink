import { ApiResponse } from "../../core/domain/dtos/common/ApiResponse";
import api from "./Interceptor";
import { PlanDto } from "../../core/domain/dtos/plan/PlanDto";

export class PlanesApi {

  async getList(): Promise<PlanDto[]> {
    try{
        const response = await api.get<ApiResponse<PlanDto[]>>(`/Plan/GetActive`);
        if (!response.data?.success) {
            throw new Error(response.data.message || "Ha ocurrido un error en el servidor");
        }
        return response.data.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        throw new Error(mensaje || "Error al consultar los planes");
    }
  }
}