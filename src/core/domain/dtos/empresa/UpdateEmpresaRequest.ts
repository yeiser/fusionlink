export interface UpdateEmpresaRequest {
    nit: string;
    razonSocial: string;
    email: string;
    direccion: string;
    telefono: string;
    sitioWeb: string;
    departamentoId: number | null;
    municipioId: number | null;
}