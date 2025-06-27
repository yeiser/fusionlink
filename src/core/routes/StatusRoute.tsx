import { useLocation } from "react-router";
import StatusPage from "../../pages/OtherPage/StatusPage";


export default function StatusRoute() {
  const location = useLocation();
  const { type = "", message = "", redirectUrl = "", textBtn = "" } = location.state || {};

  return <StatusPage type={type} message={message} redirectUrl={redirectUrl} textBtn={textBtn} />;
}