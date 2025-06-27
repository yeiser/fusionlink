import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { PlanDto } from "../core/domain/dtos/plan/PlanDto";
import { Check, X } from "lucide-react";

interface PricingPlansProps{
  planes: PlanDto[]
}

export default function PricingPlans({planes}: PricingPlansProps) {
  const [planType, setPlanType] = useState<"mensual" | "anual">("mensual");
    
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="container mx-auto px-4">
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-gray-200 p-1">
            <button
              onClick={() => setPlanType("mensual")}
              className={`px-6 py-2 text-sm font-medium rounded-full ${
                planType === "mensual"
                  ? "bg-gray-900 text-white"
                  : "text-gray-900"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setPlanType("anual")}
              className={`px-6 py-2 text-sm font-medium rounded-full ${
                planType === "anual"
                  ? "bg-gray-900 text-white"
                  : "text-gray-900"
              }`}
            >
              Anual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {planes.map((plan, index) => (
            <div
              key={index}
              className={"rounded-xl shadow-lg p-8 bg-white text-black"}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.nombre}</h3>
              <div className="flex items-end space-x-2 mb-2 text-title-md font-bold">
                ${
                  planType === "mensual" ? Intl.NumberFormat("es-CO").format(plan.precioMensual) : Intl.NumberFormat("es-CO").format(plan.precioAnual)
                }
                <span className="mb-1 inline-block text-sm text-gray-500">
                  COP
                </span>
              </div>
              <p className="mb-6 text-sm">{plan.descripcion}</p>
              <ul className="mb-6 space-y-2 text-sm">
                {plan.detalles.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {feature.checked ? <span className="text-green-500"><Check size={20}/></span> : <span className="text-error-500"><X size={20}/></span>}
                    {feature.detalle}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-md py-3 text-center text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800`}
              >
                Choose Starter
              </button>
            </div>
          ))}
        </div>
      </div>
  );
}