import React from "react";
import { useTranslation } from "react-i18next";
import Iconcalculate from "../assets/icons/calculator.svg";
import Iconcontracts from "../assets/icons/contracts.svg";
import Iconhistory from "../assets/icons/history.svg";
import IconScanner from "../assets/icons/scanner.svg";
import Iconhome from "../assets/icons/home.svg";
import IconmyContracts from "../assets/icons/myContracts.svg";
import IconmyEarnings from "../assets/icons/myEarnings.svg";
import IconmyLanding from "../assets/icons/myLanding.svg";
import IconmyTeam from "../assets/icons/myTeam.svg";
import IconFaq from "../assets/icons/faqIconWhite.svg";
import { Link, useLocation } from "react-router-dom";

const NavbarList = () => {
  const { t } = useTranslation("");
  const location = useLocation();

  let navbar = [
    {
      icon: Iconhome,
      text: "Home",
      link: "/",
    },
    {
      icon: IconmyTeam,
      text: t("Mi equipo"),
      link: "/myTeam",
    },
    {
      icon: Iconcontracts,
      text: t("Contracts"),
      link: "/contracts",
    },
    {
      icon: Iconcalculate,
      text: t("Calculadora"),
      link: "/calculator",
    },
    {
      icon: IconmyContracts,
      text: t("Mis contratos"),
      link: "/myContracts",
    },
    {
      icon: Iconhistory,
      text: t("Historial"),
      link: "/history",
    },
    {
      icon: IconmyEarnings,
      text: t("Mis Ganancias"),
      link: "/myEarnings",
    },
    {
      icon: IconScanner,
      text: t("Scanner"),
      link: "/scanner",
    },

    {
      icon: IconmyLanding,
      text: t("mi aterrizaje"),
      link: "/myLanding",
    },

    {
      icon: IconFaq,
      text: "FAQ",
      link: "/faq",
    },
  ];
  return (
    <div
      className={`${
        location.pathname === "/" ||
        location.pathname === "/welcome" ||
        location.pathname === "/preregister" ||
        location.pathname === "/register"
          ? "d-none"
          : "component-navbarList"
      }`}
    >
      <div className="list-link-navbar">
        {navbar.map((menu) => {
          return (
            <Link to={menu.link} key={menu.text}>
              <div className="container-link-navbar">
                <img className="icon-navbar" src={menu.icon} alt="" />
                <div className="link-navbar">
                  <p>{menu.text}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarList;
