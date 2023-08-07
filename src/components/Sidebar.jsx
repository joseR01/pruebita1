import React, { useEffect, useState } from "react";
import { ReactComponent as Iconcalculate } from "../assets/sidebar/calculate.svg";
import { ReactComponent as Iconcontracts } from "../assets/sidebar/contracts.svg";
import { ReactComponent as Iconhistory } from "../assets/sidebar/history.svg";
import { ReactComponent as IconScanner } from "../assets/sidebar/scanner.svg";
import { ReactComponent as Iconhome } from "../assets/sidebar/home.svg";
import { ReactComponent as IconmyContracts } from "../assets/sidebar/myContracts.svg";
import { ReactComponent as IconmyEarnings } from "../assets/sidebar/myEarnings.svg";
import { ReactComponent as IconmyLanding } from "../assets/sidebar/myLanding.svg";
import { ReactComponent as IconMenuHamburguesa } from "../assets/icons/menuHamburguesaAzul.svg";
import { ReactComponent as IconmyTeam } from "../assets/sidebar/myTeam.svg";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { ReactComponent as IconClose } from "../assets/contracts/close.svg";

const Sidebar = ({ isOpenMenu, useHandlerMenu }) => {
  Modal.setAppElement("#root");

  const { t } = useTranslation("");
  const location = useLocation();

  const [modalIsOpenPlan, setModalIsOpenPlan] = useState(false);

  function handledModalSidebar() {
    console.log("aaaaaaaaa");
    setModalIsOpenPlan(!modalIsOpenPlan);
  }

  let sideBar = [
    {
      icon: () => {
        return <Iconhome />;
      },
      text: "Home",
      link: "/",
    },
    {
      icon: () => {
        return <IconmyTeam />;
      },
      text: t("Mi equipo"),
      link: "/myTeam",
    },
    {
      icon: () => {
        return <Iconcontracts />;
      },
      text: t("Contracts"),
      link: "/contracts",
    },
    {
      icon: () => {
        return <Iconcalculate />;
      },
      text: t("Calculadora"),
      link: "/calculator",
    },
    {
      icon: () => {
        return <IconmyContracts />;
      },
      text: t("Mis contratos"),
      link: "/myContracts",
    },
    {
      icon: () => {
        return <Iconhistory />;
      },
      text: t("Historial"),
      link: "/history",
    },
    {
      icon: () => {
        return <IconScanner />;
      },
      text: t("Scanner"),
      link: "/scanner",
    },
    {
      icon: () => {
        return <IconmyEarnings />;
      },
      text: t("Mis Ganancias"),
      link: "/myEarnings",
    },
    {
      icon: () => {
        return <IconmyLanding />;
      },
      text: t("mi aterrizaje"),
      link: "/myLanding",
    },
  ];
  useEffect(() => {
    console.log("sidebard");
  }, [isOpenMenu]);

  return (
    <div
      className={` ${isOpenMenu ? "" : "d-none"} ${
        location.pathname === "/" ||
        location.pathname === "/welcome" ||
        location.pathname === "/preregister" ||
        location.pathname === "/register"
          ? "d-none"
          : "component-side-bar"
      }`}
      id="sidebar"
    >
      {/* <div className="container-menu_hamburguesa">
        <IconMenuHamburguesa
          style={{ cursor: "pointer" }}
          width={"2em"}
          onClick={handledModalSidebar}
        />
      </div>
      <div className="list-link">
        {sideBar.map((menu) => {
          return (
            <div className="container-link" key={menu.text}>
              <div className="icon-sidebar">{menu.icon()}</div>
              <div className="link-sidebar" onClick={useHandlerMenu}>
                <Link to={menu.link}>{menu.text}</Link>
              </div>
            </div>
          );
        })}
      </div> */}
      {/* <Modal
        isOpen={modalIsOpenPlan}
        contentLabel="Example Modal"
        className="container-modalSidebar"
      >
        <div className="container-menu_hamburguesa">
          <IconMenuHamburguesa
            style={{ cursor: "pointer" }}
            width={"2em"}
            onClick={handledModalSidebar}
          />
        </div>
        <div className="list-link">
          {sideBar.map((menu) => {
            return (
              <div className="container-link" key={menu.text}>
                <div className="icon-sidebar">{menu.icon()}</div>
                <div className="link-sidebar" onClick={handledModalSidebar}>
                  <Link to={menu.link}>{menu.text}</Link>
                </div>
              </div>
            );
          })}
        </div>
      </Modal> */}
    </div>
  );
};

export default Sidebar;
