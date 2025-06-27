import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { PrivateRoute } from "./core/routes/PrivateRoute";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import StatusRoute from "./core/routes/StatusRoute";
import ActivateAccount from "./pages/AuthPages/ActivateAccount";
import Empresa from "./pages/Empresa/Empresa";
import Estudios from "./pages/Estudios/Estudios";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/common/PageWrapper";
import LandingPage from "./pages/LandingPage";

 function AnimatedRoutes() {
  const location = useLocation();
  return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/home" element={<PrivateRoute><PageWrapper><Home /></PageWrapper></PrivateRoute>} />
            <Route index path="/estudios" element={<PrivateRoute><PageWrapper><Estudios/></PageWrapper></PrivateRoute>} />
            <Route path="/empresa" element={<PrivateRoute><PageWrapper><Empresa/></PageWrapper></PrivateRoute>} />

            {/* Others Page */}
            <Route path="/profile" element={<PageWrapper><UserProfiles /></PageWrapper>} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<PageWrapper><SignIn /></PageWrapper>} />
          <Route path="/login/:codigo" element={<PageWrapper><SignIn /></PageWrapper>} />
          <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><SignUp /></PageWrapper>} />

          {/* Fallback Route */}
          <Route path="/status" element={<PageWrapper><StatusRoute /></PageWrapper>} />
          <Route path="/activate-account" element={<PageWrapper><ActivateAccount/></PageWrapper>} />
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}
