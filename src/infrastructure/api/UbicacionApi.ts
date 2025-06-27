import { env } from "../../config/env";
import { ApiResponse } from "../../core/domain/dtos/common/ApiResponse";
import { Departamento } from "../../core/domain/entities/core/Departamento";
import { Municipio } from "../../core/domain/entities/core/Municipio";

export const UbicacionApi = {

  async getDepartamentos(){
    const response = await fetch(`${env.apiBaseUrl}/Municipios/GetDepartments`, {
      method: "GET"
    });

    const result: ApiResponse<Departamento[]> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }
    return result.data;
  },

  async getMunicipios(id: number){
    const response = await fetch(`${env.apiBaseUrl}/Municipios/GetMunicipalities/${id}`, {
      method: "GET"
    });

    const result: ApiResponse<Municipio[]> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Ha ocurrido un error en el servidor");
    }
    return result.data;
  }
}