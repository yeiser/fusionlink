import { ApiResponse } from "../../core/domain/dtos/common/ApiResponse";
import api from "./Interceptor";
import { SedeDto } from "../../core/domain/dtos/sede/SedeDto";
import { CreateSedeRequest } from "../../core/domain/dtos/sede/CreateSedeRequest";
import { UpdateSedeRequest } from "../../core/domain/dtos/sede/UpdateSedeRequest";

export class SedeApi {

  async getList(codigo: number): Promise<SedeDto[]> {
    try{
        const response = await api.get<ApiResponse<SedeDto[]>>(`/Sedes/GetList/${codigo}`);
        if (!response.data?.success) {
            console.log(response.data.message || "Ha ocurrido un error en el servidor");
            throw new Error("Ha ocurrido un error en el servidor");
        }
        return response.data.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error al consultar las sedes");
        throw new Error("Error al consultar las sedes");
    }
  }

  async create(data: CreateSedeRequest): Promise<ApiResponse<SedeDto>>{
    try{
        const response = await api.post<ApiResponse<SedeDto>>(`/Sedes/Create`, data);
        if (!response.data?.success) {
            console.log(response.data?.message || "Ha ocurrido un error en el servidor");
            throw new Error("Ha ocurrido un error en el servidor");
        }
        return response.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error desconocido al crear la sede");
        throw new Error("Error desconocido al crear la sede");
    }
  }

  async update(data: UpdateSedeRequest): Promise<ApiResponse<SedeDto>>{
    try{
        const response = await api.put<ApiResponse<SedeDto>>(`/Sedes/Update`, data);
        if (!response.data?.success) {
            console.log(response.data?.message || "Ha ocurrido un error en el servidor");
            throw new Error("Ha ocurrido un error en el servidor");
        }
        return response.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error desconocido al actualizar la sede");
        throw new Error("Error desconocido al actualizar la sede");
    }
  }
}