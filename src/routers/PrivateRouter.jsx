import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

//si estoy logiado me dejara ver las rutas privadas
const PrivateRouter = ({ children, isLogin }) => {
  const { t } = useTranslation("");
  const { pathname } = useLocation();

  if (isLogin === null) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <h1
          className={`${
            pathname === "/" ||
            pathname === "/welcome" ||
            pathname === "/register"
              ? "text-white"
              : "text-black"
          }`}
        >
          {t("LOADING")}
        </h1>
        <div className="container-loading">
          <div
            className={`${
              pathname === "/" ||
              pathname === "/welcome" ||
              pathname === "/register"
                ? "lds-ellipsis"
                : "lds-ellipsis-Black"
            }`}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  } else {
    return isLogin ? children : <Navigate to="/welcome" replace />;
  }
};

export default PrivateRouter;
