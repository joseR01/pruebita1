import { Route, Routes } from "react-router-dom";
import HomeN from "../pages/HomeN";
import OptionalRouter from "./OptionalRouter";
import PrivateRouter from "./PrivateRouter";
import DashboardN from "../pages/DashboardN";
import RegisterN from "../pages/RegisterN";
import WelcomeN from "../pages/WelcomeN";
import MyTeam from "../pages/MyTeam";
import Contracts from "../pages/Contracts";
import Calculator from "../pages/Calculator";
import MyContracts from "../pages/MyContracts";
import History from "../pages/History";
import MyEarnings from "../pages/MyEarnings";
import MyLanding from "../pages/MyLanding";
import ProfileN from "../pages/ProfileN";
import Level from "../pages/Level";
import Scanner from "../pages/Scanner";
import DataContext from "../context/useData";
import { useContext } from "react";
import TerminosYCondiciones from "../pages/TerminosYCondiciones";
import Faq from "../pages/Faq";
// 'member'||'server'||'metamask'
const RootRouter = () => {
  const { auth } = useContext(DataContext);
  const { isMember, isAuthServer, isAuthMetamask } = auth;
  console.log({ auth });
  return (
    <>
      <Routes>
        <Route
          path="/welcome"
          element={
            <OptionalRouter isLogin={!isAuthMetamask}>
              <WelcomeN />
            </OptionalRouter>
          }
        />

        <Route
          path="/register"
          element={
            <PrivateRouter isLogin={isAuthMetamask && !isAuthServer}>
              <RegisterN />
            </PrivateRouter>
          }
        />

        <Route
          path="/terminosYcondiciones"
          element={
            <OptionalRouter isLogin={isAuthMetamask}>
              <TerminosYCondiciones />
            </OptionalRouter>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRouter isLogin={isAuthMetamask}>
              <HomeN />
            </PrivateRouter>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRouter isLogin={isMember}>
              <DashboardN />
            </PrivateRouter>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRouter isLogin={isMember}>
              <ProfileN />
            </PrivateRouter>
          }
        />

        <Route
          path="/myTeam/*"
          element={
            <PrivateRouter isLogin={isMember}>
              <Routes>
                <Route path="/" element={<MyTeam />} />
                <Route path="/level" element={<Level />} />
              </Routes>
            </PrivateRouter>
          }
        />

        <Route
          path="/contracts"
          element={
            <PrivateRouter isLogin={isMember}>
              <Contracts />
            </PrivateRouter>
          }
        />

        <Route
          path="/calculator"
          element={
            <PrivateRouter isLogin={isMember}>
              <Calculator />
            </PrivateRouter>
          }
        />

        <Route
          path="/myContracts"
          element={
            <PrivateRouter isLogin={isMember}>
              <MyContracts />
            </PrivateRouter>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRouter isLogin={isMember}>
              <History />
            </PrivateRouter>
          }
        />

        <Route
          path="/scanner"
          element={
            <PrivateRouter isLogin={isMember}>
              <Scanner />
            </PrivateRouter>
          }
        />

        <Route
          path="/myEarnings"
          element={
            <PrivateRouter isLogin={isMember}>
              <MyEarnings />
            </PrivateRouter>
          }
        />

        <Route
          path="/myLanding"
          element={
            <PrivateRouter isLogin={isMember}>
              <MyLanding />
            </PrivateRouter>
          }
        />

        <Route
          path="/faq"
          element={
            <PrivateRouter isLogin={isMember}>
              <Faq />
            </PrivateRouter>
          }
        />

        <Route
          path="*"
          element={
            <h2 className="text-center" style={{ color: "#001848" }}>
              Page not found
            </h2>
          }
        />
      </Routes>
    </>
  );
};

export default RootRouter;
