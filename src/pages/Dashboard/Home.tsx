import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { AnnouncementBar } from "../../components/ui/Notification/AnnouncementBar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function Home() {

  const { user, empresa } = useAuth();
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/empresa");
  };

  return (
    <>
      <PageMeta
        title={ empresa?.razonSocial ?? "FusionLink" }
        description=""
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          {
            !user?.empresa && (
              <>
                <AnnouncementBar
                  title="Crea tu cuenta de empresa"
                  description="Crea tu empresa y brindale a tus usuarios una experiencia diferente."
                  textButton="Crear ahora"
                  onUpdate={handleUpdate}
                />
              </>
            )
          }
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
