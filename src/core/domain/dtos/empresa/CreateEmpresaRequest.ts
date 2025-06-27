import { AttachBase64Dto } from "../common/AttachBase64Dto";

export interface CreateEmpresaRequest {
    nit: string;
    razonSocial: string;
    email: string;
    direccion: string;
    telefono: string;
    sitioWeb: string;
    logo: AttachBase64Dto | null;
    departamentoId: number | null;
    municipioId: number | null;
}