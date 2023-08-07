import { useTranslation } from "react-i18next";
import logoWelcome from "../assets/img/Logo_IA_Money_flamas.png";

/** Web3  */
import { useWeb3Modal } from "@web3modal/react";

const WelcomeN = () => {
  const { t } = useTranslation("");
  /** Configuracion de estilos del boton Web3 */
  const {  open } = useWeb3Modal();

  async function handleConnectMetamask() {
    var url = new URL(window.location.href);
    window.linkReferral = url;
    open();
  }

  return (
    <div className="page-welcome">
      <h1 className="tittle-welcome">{t("welcome")}</h1>
      <img className="logoInvexa" src={logoWelcome} alt="" />
      <div className="container-botones">
        <div className="botones-up">
          <button className="btn-contract-welcome wallet-btn botones-globales-welcome">
            {t("contrato inteligente")}
          </button>
          <button className="btn-toGo-welcome wallet-btn botones-globales-welcome">
            {t("Ir a sitio web")}
          </button>
        </div>
        <button
          className="btn-conectWallet-welcome wallet-btn botones-globales-welcome"
          onClick={handleConnectMetamask}
        >
          {t("btnConectaTuWaller")}
        </button>
      </div>
    </div>
  );
};

export default WelcomeN;
