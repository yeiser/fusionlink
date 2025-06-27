export interface UpdateSedeRequest {
    nombre: string;
    direccion: string;
    telefono: string;
    departamentoId: number | null;
    municipioId: number | null;
    activo: boolean | null;
}