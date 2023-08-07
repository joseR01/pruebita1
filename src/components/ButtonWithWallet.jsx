import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { Tooltip as ReactTooltip } from "react-tooltip";
import FlechaWallet from "../assets/icons/flecha2B.png";
import fotoPerfil from "../assets/navbar/icons8-user-White.png";
import ProfileIcon from "../assets/icons/userIconB.svg";
import DisconnectIcon from "../assets/icons/disconnetB.svg";
import copyLink from "../assets/buttonWallet/copyLink.svg";

const ButtonWithWallet = ({ setisOpen, isOpen, imagenServer, userName }) => {
  /** contantes de los estados de wagmi */
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  /** i18n */
  const { t } = useTranslation("");

  // boton Wallet
  const [walletRecortadaFinal, setWalletRecortadaFinal] = useState("");

  useEffect(() => {
    const recortarWallet = () => {
      let onePart = null;
      let twoPart = null;

      if (address) {
        onePart = address.slice(0, 6);
        twoPart = address.slice(address.length - 6, address);
        let walletRecortada = `${onePart}...${twoPart}`;
        setWalletRecortadaFinal(walletRecortada);
      }
    };
    recortarWallet();
  }, [address, userName]);

  // const [isOpen, setisOpen] = useState(false);

  // const { userData } = useContext(DataContext);

  let linkUserData = "esto esta en el componente ButtonWithWallet";

  return (
    <div className="component-buttonWithWallet">
      <button
        className="wallet-btn d-none d-md-block"
        onClick={() => setisOpen(!isOpen)}
      >
        {isConnected ? walletRecortadaFinal : t("desconectado")}
        <img
          className={` ${isOpen ? "flechaWalletOpen" : "flechaWallet"}`}
          src={FlechaWallet}
          alt=""
        />
      </button>
      <div
        className={`${isOpen ? "container-list-opciones-wallet1" : "hidden"}`}
      >
        <div className="container-foto-name">
          <img src={imagenServer || fotoPerfil} alt="Foto de perfil" />
          <p>{userName}</p>
        </div>
        <div className="container-options">
          <Link to="/profile" onClick={() => setisOpen(!isOpen)}>
            <button className="btn-usuario btns-opciones-wallet">
              <img
                className="usuario-icon global-icon"
                src={ProfileIcon}
                alt=""
              />

              {t("perfil")}
            </button>
          </Link>

          <button
            data-tooltip-id="my-tooltip-nabvar"
            data-tooltip-content={t("link de referidos copiado")}
            // data-tooltip-variant="info"
            className="copiarLink btns-opciones-wallet"
            onClick={() => {
              navigator.clipboard.writeText(`iamoney.finance/?ref=${address}`);
            }}
          >
            <img className="messages-icon global-icon" src={copyLink} alt="" />
            {t("btnCopiarLinkRefNavbar")}
          </button>
          <ReactTooltip
            id="my-tooltip-nabvar"
            events={["click"]}
            delayHide={1000}
            place="top"
            style={{ backgroundColor: " #006998", color: "#ffffff" }}
          ></ReactTooltip>

          {/* <Link to="/messages">
            <button className="btn-messages btns-opciones-wallet">
              <img
                className="messages-icon global-icon"
                src={MessagesIcon}
                alt=""
              />

              {t("Messages")}
            </button>
          </Link> */}

          <Link to="/">
            <button
              className="btn-disconnect btns-opciones-wallet"
              onClick={disconnect}
            >
              <img
                className="disconnect-icon global-icon"
                src={DisconnectIcon}
                alt=""
              />
              {t("Desconectar")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ButtonWithWallet;
