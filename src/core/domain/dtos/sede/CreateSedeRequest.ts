export interface CreateSedeRequest{
    empresaId: number | null;
    nombre: string;
    direccion: string;
    telefono: string;
    departamentoId: number | null;
    municipioId: number | null;
}