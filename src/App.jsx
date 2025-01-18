import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import UnAuthorized from "./modules/auth/pages/UnAuthorized";
import NotFound from "./modules/auth/pages/NotFound";
import Layout from "./modules/core/Layout";
import Dashboard from "./modules/dashboard/Dashboard";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import Users from "./modules/users/Users";
import UserAccount from "./modules/finance/pages/UserAccount.admin";
import { RoleEnum } from "./enums/role-enum";
import WithPageRequiredAuth from "./modules/auth/context/with-page-required-auth";
import WithPageRequiredGuest from "./modules/auth/context/with-page-required-guest";
import Services from "./modules/services/pages/Services.admin";
import ServicesView from "./modules/services/pages/Services.user";
import FinanceUser from "./modules/finance/pages/Finance.user";
import Agencies from "./modules/agencies/Agencies";
import Finance from "./modules/finance/pages/Finance.admin";
import Accounts from "./modules/finance/pages/Accounts.admin";
import Reservation from "./modules/reservation/pages/Reservation.admin";
import ReservationPage from "./modules/reservation/pages/ReservationPage.admin";
import HotelsPage from "./modules/services/pages/Hotels.page";
import ReserveService from "./modules/reservation/pages/ReserveService.user";
import RoomsPage from "./modules/services/pages/Rooms.page";
import ReservationPageUser from "./modules/reservation/pages/ReservationPage.user";
import VisaApplicationForm from "./modules/visa/VisaApplicatoin";
import VisaAdd from "./modules/visa/VisaAdd";
import ShowVisa from "./modules/visa/showVisa";
import GetVisaData from "./modules/visa/getVisaData";
import VisaRequired from "./modules/visa/pages.js/VisaRequired";
import UserAppliedVisa from "./modules/visa/pages.js/UserAppliedVisa";
import UserRequestedPackage from "./modules/Package/pages/RequestedPackage.user";
import { User } from "@nextui-org/react";
import VisaViewPage from "./modules/visa/pages.js/visa.page";
import VisaReserveService from "./modules/visa/pages.js/VisaReserveService.user";
import VisaReservationPageUser from "./modules/visa/pages.js/VisaReservationPage.user";
import VisaReservationPage from "./modules/visa/pages.js/ReservationPage.admin";
import RequestPackage from "./modules/Package/pages/requistPakage.user.page";
import SafariPage from "./modules/services/safari/Safari.page";
import TransportationsPage from "./modules/services/transportation/Transportation.Page";
import StandardPackagesPage from "./modules/services/packages/Packages.page";
import FlightPage from "./modules/services/flights/flights.Page";

const adminRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "agencies", element: <Agencies /> },
  { path: "users", element: <Users /> },
  { path: "services", element: <Services /> },
  { path: "reservations", element: <Reservation /> },
  { path: "reservation/:id", element: <ReservationPage /> },
  { path: "reservation/visa/:id", element: <VisaReservationPage /> },
  { path: "finance", element: <Finance /> },
  { path: "accounts", element: <Accounts /> },
  { path: "userAccount/:id", element: <UserAccount /> },
];

const userRoutes = [
  { path: "user/home", element: <ServicesView /> },
  { path: "user/finance", element: <FinanceUser /> },
  { path: "user/reservations", element: <Reservation /> },
  { path: "user/reserve/:id", element: <ReserveService type="room" /> },
  { path: "user/reserve/visa/:id", element: <VisaReserveService /> },
  {
    path: "user/reserve/flight/:id",
    element: <ReserveService type="flight" />,
  },
  { path: "user/safari/:id", element: <ReserveService type="safari" /> },
  {
    path: "user/transportations/:id",
    element: <ReserveService type="transportation" />,
  },
  {
    path: "user/standard-packages/:id",
    element: <ReserveService type="standard-packages" />,
  },
  { path: "user/hotels/:id", element: <HotelsPage /> },
  { path: "user/hotel-rooms/:id", element: <RoomsPage /> },
  { path: "user/readyvisa/:id", element: <VisaViewPage /> },
  { path: "user/safariPage/:id", element: <SafariPage /> },
  { path: "user/transportationsPage/:id", element: <TransportationsPage /> },
  { path: "user/standard-packagesPage/:id", element: <StandardPackagesPage /> },
  { path: "user/flightsPage/:id", element: <FlightPage /> },
  { path: "user/ReservationUser/:id", element: <ReservationPageUser /> },
  {
    path: "user/VisaReservationUser/:id",
    element: <VisaReservationPageUser />,
  },
];

const sharedRoutes = [
  { path: "visa/new", element: <VisaApplicationForm /> },
  { path: "visa/add", element: <VisaAdd /> },
  { path: "visa/show", element: <ShowVisa /> },
  { path: "user/requestedPackage", element: <UserRequestedPackage /> },
  { path: "user/requestedVisa", element: <UserAppliedVisa /> },
  { path: "visa/applications", element: <VisaRequired /> },
  { path: "user/requestPackage", element: <RequestPackage /> },
];

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.resolvedLanguage === "ar" ? "rtl" : "ltr";
    document.getElementsByTagName("html")[0].setAttribute("dir", dir);
  }, [i18n.resolvedLanguage]);

  const wrapInLayout = (element, roles) => (
    <WithPageRequiredAuth options={{ roles }}>
      <Layout>{element}</Layout>
    </WithPageRequiredAuth>
  );

  const renderRoutes = (routes, roles) =>
    routes.map(({ path, element }) => (
      <Route key={path} path={path} element={wrapInLayout(element, roles)} />
    ));

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            path="login"
            element={
              <WithPageRequiredGuest>
                <Login />
              </WithPageRequiredGuest>
            }
          />
          <Route path="unauthorized" element={<UnAuthorized />} />
          <Route
            path="/visa/getvisadata/:type/:country"
            element={<GetVisaData />}
          />

          {/* Admin routes */}
          {renderRoutes(adminRoutes, [RoleEnum.admin])}

          {/* User routes */}
          {renderRoutes(userRoutes, [RoleEnum.travelAgent])}

          {/* Shared routes */}
          {renderRoutes(sharedRoutes, [RoleEnum.admin, RoleEnum.travelAgent])}

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
