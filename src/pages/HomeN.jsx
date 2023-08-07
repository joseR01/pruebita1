import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TimCounter from "../components/TimerCounter";
import { checkIsUserRegistrationKYC } from "../contract/methos";
import { useAccount, useBalance } from "wagmi";
import DataContext from "../context/useData";

const Home = () => {
  /** Front */
  const { t } = useTranslation("");
  const navigate = useNavigate();
  // diferencial de tiempo entre fechas
  const [stadoTheLink, setStadoTheLink] = useState("");
  const [isUserRegisterKYC, setIsUserRegisterKYC] = useState(false);
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    token: "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684",
  });

  const { userC, auth, handlerConnection } = useContext(DataContext);

  console.log({ data, isError, isLoading });
  useEffect(() => {
    if (window.linkReferral) {
      const nuevaURL = `${window?.linkReferral.search}`;
      const estado = { data: "información adicional" };
      window.history.pushState(estado, "", nuevaURL);
      setStadoTheLink(window?.linkReferral?.search);
    }
    setStadoTheLink(window?.location?.search);

    checkUserRegistrationKYC();
  }, [stadoTheLink]);

  const checkUserRegistrationKYC = async () => {
    const isRegister = await checkIsUserRegistrationKYC(address);
    console.log({ isRegister }, "home");
    if (isRegister === true) {
      setIsUserRegisterKYC(true);
    } else {
      setIsUserRegisterKYC(false);
    }
  };

  // variables de totales
  let totalUsdtStaked = 0;
  let totalReferralErnings = 0;

  return (
    <div className="component-home">
      <div className="container-online">
        <h1 className="titulo-online">{t("Pre lanzamiento")}</h1>
        <TimCounter styles={{ fontSize: "TimerCounter" }} />
      </div>

      <div className="container-info-home">
        <div className="container-total">
          <div className="container-total-staked">
            <p className="texto-staked">{t("total usdt staked")}</p>
            <p className="cantidad-staked">{`$ ${totalUsdtStaked}`}</p>
          </div>
          <div className="container-total-referralEarnings">
            <p className="texto-referralEarnings">
              {t("total Referral Earnings")}
            </p>
            <p className="cantidad-referralEarnings">{`$ ${totalReferralErnings}`}</p>
          </div>
        </div>
        <div className="container-botones-info row">
          <button className="boton-contratoInt boton-global-home col-6 col-md-3 my-2 my-lg-0">
            {t("contrato inteligente")}
          </button>
          <button className="boton-sitio-web boton-global-home col-6 col-md-3 my-2 my-lg-0">
            {t("Ir a sitio web")}
          </button>
          <button className="boton-informacion boton-global-home col-6 col-md-3 my-2 my-lg-0">
            {t("informacion")}
          </button>
          <button className="boton-social boton-global-home col-6 col-md-3 my-2 my-lg-0">
            {t("social")}
          </button>
        </div>
      </div>
      <Button
        userC={userC}
        auth={auth}
        isUserRegisterKYC={isUserRegisterKYC}
        navigate={navigate}
        stadoTheLink={stadoTheLink}
        t={t}
        handlerConnection={handlerConnection}
      />
    </div>
  );
};

function Button({
  userC,
  auth,
  isUserRegisterKYC,
  navigate,
  stadoTheLink,
  handlerConnection,
  t,
}) {
  if (auth.isMember) {
    return (
      <button
        className="boton-preRegister boton-global-home"
        onClick={() => {
          navigate(`/dashboard`);
        }}
      >
        {t("dashboardSideBar")}
      </button>
    );
  } else if (!auth.isAuthServer) {
    return (
      <button
        className="boton-preRegister boton-global-home"
        onClick={() => {
          navigate(`/register${stadoTheLink}`);
        }}
      >
        {isUserRegisterKYC ? t("Sincronizar datos") : t("pre registrar")}
      </button>
    );
  }
}

export default Home;
