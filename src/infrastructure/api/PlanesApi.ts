import { ApiResponse } from "../../core/domain/dtos/common/ApiResponse";
import api from "./Interceptor";
import { PlanDto } from "../../core/domain/dtos/plan/PlanDto";

export class PlanesApi {

  async getList(): Promise<PlanDto[]> {
    try{
        const response = await api.get<ApiResponse<PlanDto[]>>(`/Plan/GetActive`);
        if (!response.data?.success) {
          console.log(response.data.message || "Ha ocurrido un error en el servidor");
            throw new Error("Ha ocurrido un error en el servidor");
        }
        return response.data.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error al consultar los planes");
        throw new Error("Error al consultar los planes");
    }
  }
}