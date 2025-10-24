import { ApiResponse } from "../../core/domain/dtos/common/ApiResponse";
import { PageResponse } from "../../core/domain/dtos/common/PageResponse";
import { CreateEstudioRequest } from "../../core/domain/dtos/estudios/CreateEstudioRequest";
import { EstudioDto } from "../../core/domain/dtos/estudios/EstudioDto";
import api from "./Interceptor";

export class EstudiosApi {

  async getListByEmpresa(page: number, search: string): Promise<PageResponse<EstudioDto>> {
    try{
        const params = new URLSearchParams({page: page.toString()});
        if(search.trim())
            params.append("search", search.trim());

        const response = await api.get<ApiResponse<PageResponse<EstudioDto>>>(`/ReporteEstudios/GetListByEmpresa?${params.toString()}`);
        if (!response.data?.success) {
            console.log(response.data.message || "Ha ocurrido un error en el servidor")
            throw new Error("Ha ocurrido un error en el servidor");
        }
        return response.data.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error al consultar los estudios")
        throw new Error("Error al consultar los estudios");
    }
  }

  async getListByUsuario(page: number, search: string): Promise<PageResponse<EstudioDto>> {
    try{
        const params = new URLSearchParams({page: page.toString()});
        if(search.trim())
            params.append("search", search.trim());

        const response = await api.get<ApiResponse<PageResponse<EstudioDto>>>(`/ReporteEstudios/GetListByUsuario?${params.toString()}`);
        if (!response.data?.success) {
            throw new Error(response.data.message || "Ha ocurrido un error en el servidor");
        }
        return response.data.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        throw new Error(mensaje || "Error al consultar los estudios");
    }
  }

  async create(data: CreateEstudioRequest): Promise<ApiResponse<EstudioDto>>{
    try{
        const response = await api.post<ApiResponse<EstudioDto>>(`/ReporteEstudios/Create`, data);
        if (!response.data?.success) {
            throw new Error(response.data?.message || "Ha ocurrido un error en el servidor");
        }
        return response.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        throw new Error(mensaje || "Error desconocido al crear la empresa");
    }
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    try{
        const response = await api.delete<ApiResponse<null>>(`/ReporteEstudios/Delete/${id}`);
        if (!response.data?.success) {
            throw new Error(response.data.message || "Ha ocurrido un error en el servidor");
        }
        return response.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        throw new Error(mensaje || "Error al eliminar el estudio clínico");
    }
  }
}