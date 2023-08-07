import flechita from "../assets/icons/flechaLevel.svg";
import { useTranslation } from "react-i18next";
import libreta from "../assets/level/libreta.png";
import flechaIcon from "../assets/level/flecha.png";
import { useNavigate } from "react-router-dom";

const Level = () => {
  const { t } = useTranslation("");
  const navigate = useNavigate();

  const wallet = [
    {
      wallet: `${t("wallet")} 1`,
      user: "Analilia",
      totalInvest: "$ 2.000",
      sponsor: "Admin",
      id: 1,
    },
    {
      wallet: `${t("wallet")} 2`,
      user: "Mauro23",
      totalInvest: "$ 2.000",
      sponsor: "Analilia",
      id: 2,
    },
    {
      wallet: `${t("wallet")} 3`,
      user: "Millonarios",
      totalInvest: "$ 2.000",
      sponsor: "Analilia",
      id: 3,
    },
  ];

  const planes = [
    {
      plan: `6 ${t("meses")}`,
      investment: "$ 300",
      dateStart: "1/1/2023",
      dateEnd: "31/06/2023",
      status: t("active"),
    },
    {
      plan: `18 ${t("meses")}`,
      investment: "$ 300",
      dateStart: "1/1/2023",
      dateEnd: "31/06/2023",
      status: t("active"),
    },
  ];

  return (
    <div className="page-level">
      <img
        className="flechaBack"
        src={flechita}
        alt=""
        onClick={() => navigate("/myTeam")}
      />
      <div className="container-level">
        <h1>{t("nivel")} 1</h1>
        <div className="container-tittle-wallet">
          <p className="datosWalletT">{t("wallet")}</p>
          <p className="datosUserT">{t("usuarioSideBar")}</p>
          <p className="datosTotalInvestT">{t("total invest")}</p>
          <p className="datosSponsorT">{t("sponsor")}</p>
        </div>
        <div className="accordion" id="accordionExample">
          {wallet.map((datos, index) => {
            return (
              <div className="accordion-item" key={index}>
                <div className="accordion-header">
                  <p className="datosWallet">{datos.wallet}</p>
                  <p className="datosUser">{datos.user}</p>
                  <p className="datosTotalInvest">{datos.totalInvest}</p>
                  <p className="datosSponsort">{datos.sponsor}</p>
                  <img
                    src={libreta}
                    alt="libreta"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accordion${datos.id}`}
                    aria-expanded="false"
                    aria-controls={`accordion${datos.id}`}
                  />
                </div>
                <div
                  id={`accordion${datos.id}`}
                  className={`accordion-collapse collapse`}
                >
                  <div className={`accordion-body`}>
                    <div className="container-header-body">
                      <p className="plan">{t("plan")}</p>
                      <p className="investment">{t("investment")}</p>
                      <p className="dateStart">{t("dateStart")}</p>
                      <p className="dateEnd">{t("dateEnd")}</p>
                      <p className="status">{t("status")}</p>
                      <img
                        src={flechaIcon}
                        alt=""
                        data-bs-toggle="collapse"
                        data-bs-target={`#accordion${datos.id}`}
                        aria-expanded="false"
                        aria-controls={`accordion${datos.id}`}
                      />
                    </div>
                    <div className="container-body-body">
                      {planes.map((plan, index) => {
                        return (
                          <div key={index} className="container-info">
                            <p className="plan">{plan.plan}</p>
                            <p className="investment">{plan.investment}</p>
                            <p className="dateStart">{plan.dateStart}</p>
                            <p className="dateEnd">{plan.dateEnd}</p>
                            <p className="status">{plan.status}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Level;
