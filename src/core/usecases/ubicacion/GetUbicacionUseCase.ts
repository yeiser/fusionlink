import { useEffect, useState } from "react";
import { UbicacionApi } from "../../../infrastructure/api/UbicacionApi";
import { Departamento } from "../../domain/entities/core/Departamento";
import { Municipio } from "../../domain/entities/core/Municipio";

export function GetUbicacionUseCase(){
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState<number | null>(null);

    useEffect(() => {
        const loadDepartamentos = async () =>{
            const data = await UbicacionApi.getDepartamentos();
            setDepartamentos(data);
        }
        loadDepartamentos();
    }, []);

    useEffect(() => {
        if(selectedDepartamento){
            UbicacionApi.getMunicipios(selectedDepartamento).then(setMunicipios);
        }
    }, [selectedDepartamento]);

    return {
        departamentos,
        municipios,
        selectedDepartamento,
        setSelectedDepartamento
    };
}