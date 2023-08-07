import { useTranslation } from "react-i18next";
import ContainerLanguage from "./ContainerLanguage";
import ButtonWithWallet from "./ButtonWithWallet";
import Logo from "../assets/img/LogoIAMoneyNavbarVerde.png";
import LogoBlanco from "../assets/img/LogoIAMoneywhite.png";
import { ReactComponent as IconMenuHamburguesa } from "../assets/icons/menuHamburguesaAzul.svg";
import FotoPerfil from "../assets/navbar/icons8-user-30.png";
import Modal from "react-modal";
import { ReactComponent as Iconcalculate } from "../assets/sidebar/calculate.svg";
import { ReactComponent as Iconcontracts } from "../assets/sidebar/contracts.svg";
import { ReactComponent as Iconhistory } from "../assets/sidebar/history.svg";
import { ReactComponent as IconScanner } from "../assets/sidebar/scanner.svg";
import { ReactComponent as Iconhome } from "../assets/sidebar/home.svg";
import { ReactComponent as IconmyContracts } from "../assets/sidebar/myContracts.svg";
import { ReactComponent as IconmyEarnings } from "../assets/sidebar/myEarnings.svg";
import { ReactComponent as IconmyLanding } from "../assets/sidebar/myLanding.svg";
import { ReactComponent as IconmyTeam } from "../assets/sidebar/myTeam.svg";
import { ReactComponent as IconFaq } from "../assets/sidebar/faqIconBlue.svg";

/** Estados de Wagmi */
import { useAccount } from "wagmi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { URLApi } from "../utilities/networks";
import DataContext from "../context/useData";
import { useContext } from "react";

const NavbarN = ({ useHandlerMenu }) => {
  /** contantes de los estados de wagmi */
  const { isConnected } = useAccount();
  const { pathname } = useLocation();
  Modal.setAppElement("#root");

  /** i18n */
  const { t } = useTranslation("");
  const { userC, auth } = useContext(DataContext);
  const [imagenServer, SetImagenServer] = useState(null);
  const [userName, setUserName] = useState("aaaa");
  /** Configuracion de estilos del boton Web3 */
  const [isOpenMenu, setisOpenMenu] = useState(false);

  const [modalIsOpenPlan, setModalIsOpenPlan] = useState(false);

  function handledModalSidebar() {
    setModalIsOpenPlan(!modalIsOpenPlan);
  }

  useEffect(() => {
    if (auth.isAuthServer) {
      if (userC.image) {
        SetImagenServer(URLApi + "/" + userC.image);
      }
      if (userC.name) {
        setUserName(userC.name);
      }
    }
  }, [userC]);

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
    {
      icon: () => {
        return <IconFaq />;
      },
      text: "FAQ",
      link: "/faq",
    },
  ];

  if (pathname === "/register") {
    return;
  }
  return (
    <div
      className={`${
        pathname === "/" || pathname === "/welcome" || pathname === "/register"
          ? "container-navbarTovaTransparent"
          : "container-navbarTova"
      }`}
    >
      {pathname === "/" ||
      pathname === "/welcome" ||
      pathname === "/register" ? (
        ""
      ) : (
        <div className="container-menu_hamburguesa">
          <IconMenuHamburguesa
            onClick={handledModalSidebar}
            style={{ cursor: "pointer", width: "2em" }}
          />
          <Modal
            isOpen={modalIsOpenPlan}
            onRequestClose={handledModalSidebar}
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
          </Modal>
        </div>
      )}
      <div className="container-logoNavbar">
        {pathname === "/welcome" ? (
          ""
        ) : pathname === "/" ? (
          <img src={LogoBlanco} alt="Logo" />
        ) : (
          <img src={Logo} alt="Logo" />
        )}
      </div>

      <div className="container-info-right">
        <ContainerLanguage />
        {pathname === "/welcome" || pathname === "/" ? (
          ""
        ) : (
          <div className="container-buttons">
            {!isConnected ? (
              <></>
            ) : (
              <div className="container-foto-btn">
                <ButtonWithWallet
                  setisOpen={setisOpenMenu}
                  isOpen={isOpenMenu}
                  imagenServer={imagenServer}
                  userName={userName}
                />
                <img
                  className="imgPerfil"
                  // src={imagenServer}
                  src={imagenServer || FotoPerfil}
                  alt=""
                  onClick={() => setisOpenMenu(!isOpenMenu)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarN;
