import { Metadatos } from "../common/Metadatos";

export interface EstudioDto{
    id: number, 
    identificacion: string;
    tipoIdentificacion: string;
    nombrePaciente: string;
    nombreEstudio: string;
    fechaEstudio: Date;
    fechaReporte?: Date;
    fechaSubida: Date;
    usuarioSubida: string;
    url: string;
    metadatos?: Metadatos[] | null;
}