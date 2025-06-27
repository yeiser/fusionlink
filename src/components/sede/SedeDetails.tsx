import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { SedeDto } from "../../core/domain/dtos/sede/SedeDto";
import Button from "../ui/button/Button";

interface SedeDetailsProps {
  sede: SedeDto;
  onClose: () => void;
}

dayjs.extend(relativeTime);
dayjs.locale('es');

export default function SedeDetails({sede, onClose}: SedeDetailsProps){
    return(
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Detalles de sede
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Aquí puedes ver la información completa de las sedes de tu empresa.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div className="col-span-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nombre
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { sede?.nombre}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Dirección
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { sede.direccion }
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Teléfono
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {sede.telefono}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Departamento
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {sede.departamento}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Municipio
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {sede.municipio}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Estado
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { sede.activo ? "ACTIVO" : "INACTIVO"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Creado
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { dayjs(sede.creado).fromNow()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
        </div>
    );
}
