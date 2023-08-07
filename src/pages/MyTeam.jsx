import { useTranslation } from "react-i18next";
import ojitoVisible from "../assets/icons/visibility.svg";
import { useNavigate } from "react-router-dom";
import ButtonDashboard from "../components/ButtonDashboard";

const MyTeam = () => {
  const { t } = useTranslation("");
  const navigate = useNavigate();

  const totalTeam = [
    {
      team: 0,
      totalStaked: 0,
      estimateEarnings: 0,
    },
  ];

  const referenceLevel = [
    {
      nivel: 1,
      team: 3,
      totalInvest: "6.000.00",
      residual: "2%",
      totalResidual: 120,
    },
    {
      nivel: 2,
      team: 10,
      totalInvest: "6.000.00",
      residual: "1.5%",
      totalResidual: 90,
    },
    {
      nivel: 3,
      team: 12,
      totalInvest: "8.000.00",
      residual: "1%",
      totalResidual: 80,
    },
    {
      nivel: 4,
      team: 8,
      totalInvest: "15.000.00",
      residual: "1%",
      totalResidual: 150,
    },
    // {
    //   nivel: 5,
    //   team: 9,
    //   totalInvest: "40.000.00",
    //   residual: "0.5%",
    //   totalResidual: 200,
    // },
  ];

  return (
    <div className="page-myTeam d-flex flex-column">
      <ButtonDashboard />
      <h1 className="tittle-team fw-bold">{t("Estado de mi equipo")}</h1>
      <div className="container-info-total-level row">
        <div className="col-12 col-lg-4">
          <div className="container-total-team">
            <h1 className="fw-bold container-total-team-title">{t("total")}</h1>
            {totalTeam.map((team, index) => {
              return (
                <div
                  className="container-map-info d-flex flex-column"
                  key={index}
                >
                  <div className="container-team">
                    <p className="team fw-bold">{t("equipo")}</p>
                    <p>{team.team}</p>
                  </div>
                  <div className="container-totalStaked">
                    <p className="totalStaked fw-bold">{t("totalStaked")}</p>
                    <p>$ {team.totalStaked}</p>
                  </div>
                  <div className="container-estimated">
                    <p className="estimatedEarnings fw-bold">
                      {t("estimatedEarnings")}
                    </p>
                    <p>$ {team.estimateEarnings}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="container-level-refencial-team">
            <h1 className="fw-bold">{t("nivel de referencia")}</h1>
            <div className="container-tittles-referencial">
              <p className="nivelT">{t("nivel")}</p>
              <p className="teamT">{t("equipo")}</p>
              <p className="totalInvestT">{t("total invest")}</p>
              <p className="residualT">{t("residual")}</p>
            </div>
            {referenceLevel.map((level, index) => {
              return (
                <div className="container-level" key={index}>
                  <p className="nivel">
                    {t("nivel")} {level.nivel}
                  </p>
                  <p className="team">{level.team}</p>
                  <p className="totalInvest">{level.totalInvest}</p>
                  <p className="residual">{level.residual}</p>
                  <p className="totalResidual">$ {level.totalResidual}</p>
                  <img
                    src={ojitoVisible}
                    alt=""
                    onClick={() => navigate("/myTeam/level")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
