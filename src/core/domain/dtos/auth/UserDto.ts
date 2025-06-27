import { EmpresaDto } from "../empresa/EmpresaDto";

export interface UserDto {
  tipoIdentificacion: string;
  identificacion: string;
  email: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  avatar: string;
  creado: Date;
  estado: string;
  token: string;
  empresa: EmpresaDto;
}