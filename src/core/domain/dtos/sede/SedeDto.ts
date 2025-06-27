export interface SedeDto{
    id: number,
    nombre: string,
    direccion: string,
    telefono: string,
    empresaId: number,
    activo: boolean,
    departamentoId: number,
    departamento: string,
    municipioId: number,
    municipio: string,
    creado: Date
}