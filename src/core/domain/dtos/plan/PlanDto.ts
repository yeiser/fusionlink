import { DetallePlanDto } from "./DetallePlanDto"

export interface PlanDto{
    id: number,
    nombre: string,
    descripcion: string,
    detalles: DetallePlanDto[],
    precioMensual: number,
    precioAnual: number,
    activo: boolean
}