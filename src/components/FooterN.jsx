import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const FooterN = () => {
  const { t } = useTranslation("");
  const location = useLocation();

  if (location.pathname === "/register") {
    return;
  }
  return (
    <div
      className={`${
        location.pathname === "/" ||
        location.pathname === "/welcome" ||
        location.pathname === "/preRegister"
          ? "component-footer"
          : "component-footerAzul"
      }`}
    >
      <p className="titulo-footer">{t("footerNuevo")}</p>
    </div>
  );
};

export default FooterN;
