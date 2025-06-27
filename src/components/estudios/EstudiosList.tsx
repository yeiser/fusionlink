import { EstudioDto } from "../../core/domain/dtos/estudios/EstudioDto";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { DropdownActions } from "../common/DropdownActions";
import Paginator from "../common/Paginator";
import { useEffect, useState } from "react";
import { PageResponse } from "../../core/domain/dtos/common/PageResponse";
import { useAuth } from "../../context/AuthContext";
import { PlusCircle, Search } from "lucide-react";

interface Props {
  estudios: PageResponse<EstudioDto> | null;
  handleOptions: (type: "descargar" | "eliminar", estudio: EstudioDto) => void;
  onAgregar: () => void;
  onPageChange: (page: number, search: string) => void;
  searchValue: string;
}

export default function EstudiosList({ estudios, handleOptions, onAgregar, onPageChange, searchValue }: Props) {
  const currentPage = estudios?.pageNumber ?? 1;
  const totalPages = estudios?.totalPages ?? 1;

  const { user } = useAuth();
  const [textSearch, setTextSearch] = useState(searchValue??"");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (textSearch?.trim()) {
        onPageChange(1, textSearch?.trim());
      }
    }
  };

  useEffect(() => {
    setTextSearch(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Estudios realizados</h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form>
              <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none top-1/2 left-4">
                <Search size={22} className="text-gray-500 dark:text-gray-400"/>
                </span>
                <input type="text"
                  placeholder="Buscar"
                  value={textSearch}
                  onChange={(e) => setTextSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"></input>
            </div>
            </form>
              {
                user?.empresa && (
                  <>
                  <div className="relative">
                    <button
                      onClick={onAgregar}
                      className="text-theme-sm shadow-theme-xs inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                    >
                      <PlusCircle size={20}/>
                      Cargar estudio
                    </button>
                </div>
                </>
                )
              }
          </div>
          
        </div>
        <div className="max-w-full overflow-x-auto custom-scrollbar h-full">
        <Table>
          <TableHeader className="border-gray-100 border-y bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Paciente</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nombre del estudio</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Fecha del estudio</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Fecha del reporte</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Fecha de carga</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Acciones</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {estudios?.data.map((item) => {
              const actions = [
                {
                  label: "Descargar",
                  onClick: () => handleOptions("descargar", item)
                },
                ...(user?.empresa ? [
                  {
                    label: "Eliminar",
                    onClick: () => handleOptions("eliminar", item)
                  }
                ] : [])
              ];

              return (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-3">
                    
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {item.nombrePaciente}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {item.tipoIdentificacion}-{item.identificacion}
                      </span>
                    </div>
                  </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.nombreEstudio}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(item.fechaEstudio).toLocaleDateString("es-CO")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.fechaReporte ? new Date(item.fechaReporte).toLocaleDateString("es-CO") : ""}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(item.fechaSubida).toLocaleDateString("es-CO")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center justify-center">
                      <DropdownActions actions={actions} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Paginator currentPage={currentPage!} totalPages={totalPages!} onPageChange={(page) => onPageChange(page, textSearch)} />
      </div>
      </div>
    </>
  );
}