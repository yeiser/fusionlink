import { ApiResponse } from "../../core/domain/dtos/common/ApiResponse";
import { CreateEmpresaRequest } from "../../core/domain/dtos/empresa/CreateEmpresaRequest";
import { EmpresaDto } from "../../core/domain/dtos/empresa/EmpresaDto"; 
import { UpdateEmpresaRequest } from "../../core/domain/dtos/empresa/UpdateEmpresaRequest";
import { UploadLogoEmpresaRequest } from "../../core/domain/dtos/empresa/UploadLogoEmpresaRequest";
import api from "./Interceptor";

export class EmpresaApi {

  async getEmpresaByCodigo(codigo: string): Promise<EmpresaDto> {
    try{
        const response = await api.get<ApiResponse<EmpresaDto>>(`/Empresas/GetEmpresaByCodigo/${codigo}`);
        if (!response.data?.success) {
            console.log(response.data.message || "Ha ocurrido un error en el servidor");
            throw new Error("Ha ocurrido un error en el servidor");
        }
        return response.data.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error desconocido al consultar la empresa");
        throw new Error("Error desconocido al consultar la empresa");
    }
  }

  async create(data: CreateEmpresaRequest): Promise<ApiResponse<EmpresaDto>>{
    try{
        const response = await api.post<ApiResponse<EmpresaDto>>(`/Empresas/Create`, data);
        if (!response.data?.success) {
            console.log(response.data?.message || "Ha ocurrido un error en el servidor");
            throw new Error("Ha ocurrido un error en el servidor");
        }
        return response.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error desconocido al crear la empresa")
        throw new Error("Error desconocido al crear la empresa");
    }
  }

  async uploadLogo(data: UploadLogoEmpresaRequest): Promise<ApiResponse<EmpresaDto>>{
    try{
        const response = await api.put<ApiResponse<EmpresaDto>>(`/Empresas/UploadLogo`, data);
        if (!response.data?.success) {
            throw new Error(response.data?.message || "Ha ocurrido un error en el servidor");
        }
        return response.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error desconocido al subir la imagen");
        throw new Error("Error desconocido al subir la imagen");
    }
  }

  async update(data: UpdateEmpresaRequest): Promise<ApiResponse<EmpresaDto>>{
    try{
        const response = await api.put<ApiResponse<EmpresaDto>>(`/Empresas/Update`, data);
        if (!response.data?.success) {
            console.log(response.data?.message || "Ha ocurrido un error en el servidor");
            throw new Error("Ha ocurrido un error en el servidor");
        }
        return response.data;
    }
    catch(error: any){
        const mensaje = error?.response?.data?.message || error.message;
        console.log(mensaje || "Error desconocido al editar la empresa");
        throw new Error("Error desconocido al editar la empresa");
    }
  }
}