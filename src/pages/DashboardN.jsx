import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation("");

  let dato = 0;
  let totalStaked = dato;
  let onClaimContract = dato;
  let profits = dato;
  let totalReferralEarnings = dato;
  let onTrade = dato;

  let myTotalInvestment = dato;
  let myReferralEarnings = dato;
  let myEarningsMensual = dato;
  let myEarningsDiarias = dato;

  return (
    <div className="page-dashboard">

      <div className="container-info-dashboard container-fluid">
        <div className="container-info-summary">
          <h1 className="tittle-summary">{t("summary")}</h1>
          <div className="linea-summary"></div>
          <div className="linea-tittle-montoS"></div>
          <div className="container-total-info d-flex justify-content-between">
            <div className="total-stake container-info">
              <p className="name">{t("Total staked")} </p>
              <p className="monto">$ {totalStaked}</p>
            </div>
            <div className="onClaimContract container-info">
              <p className="name">{t("On Claim Contract")} </p>
              <p className="monto">$ {onClaimContract}</p>
            </div>
            <div className="profits container-info">
              <p className="name">{t("Profits")} </p>
              <p className="monto">$ {profits}</p>
            </div>
            <div className="totalReferralEarnings container-info">
              <p className="name">{t("Total Referral Earnings")} </p>
              <p className="monto">$ {totalReferralEarnings}</p>
            </div>
            <div className="onTrade container-info">
              <p className="name">{t("On Trade")} </p>
              <p className="monto">$ {onTrade}</p>
            </div>
          </div>
        </div>
        <div className="container-info-myAccount">
          <h1 className="tittle-my-account">{t("My Account")}</h1>
          <div className="linea-my-account"></div>
          <div className="linea-tittle-monto"></div>
          <div className="container-info-my-account">
            <div className="my-total-investment">
              <p className="name">{t("My total investment")} </p>
              <p className="monto">$ {myTotalInvestment}</p>
            </div>
            <div className="my-referral-earnings">
              <p className="name">{t("My Referral Earnings")} </p>
              <p className="monto">$ {myReferralEarnings}</p>
            </div>
            <div className="my-ernings d-none d-md-block">
              <div className="d-flex">
                <div className="d-flex flex-column ">
                  <p className="name">{t("My Earnings")} </p>
                  <p className="monto">$ {myEarningsMensual}</p>
                  <p className="monto mt-4">$ {myEarningsDiarias}</p>
                </div>
                <div className=" container-mes-dias d-flex flex-column">
                  <p>{t("mensual")}</p>
                  <p className="mt-4">{t("diario")}</p>
                </div>
              </div>
            </div>

            <div className="my-erningsMovil  d-block d-md-none">
              <div className="">
                <p className="name text-center w-100">{t("My Earnings")} </p>
                <div className="d-flex justify-content-center ">
                  <p className="monto">$ {myEarningsMensual}</p>
                  <p>{t("mensual")}</p>
                </div>
                <div className=" container-mes-dias d-flex justify-content-center">
                  <p className="monto">$ {myEarningsDiarias}</p>
                  <p className="">{t("diario")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
