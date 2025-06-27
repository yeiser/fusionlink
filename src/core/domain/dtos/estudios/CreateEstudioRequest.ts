import { AttachBase64Dto } from "../common/AttachBase64Dto";
import { Metadatos } from "../common/Metadatos";

export interface CreateEstudioRequest{ 
    identificacion: string;
    tipoIdentificacion: string;
    nombrePaciente: string;
    nombreEstudio: string;
    fechaEstudio: Date;
    fechaReporte: Date | null;
    usuarioSubida: string;
    uploadFile: AttachBase64Dto;
    metadatos?: Metadatos[];
}