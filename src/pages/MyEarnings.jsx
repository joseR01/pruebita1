import { useTranslation } from "react-i18next";
import pasiveIcon from "../assets/myEarnings/payments.svg";
import residualIcon from "../assets/myEarnings/dolar_money.svg";
import expiredIcon from "../assets/myEarnings/sell.svg";
import totalWIcon from "../assets/myEarnings/totalWithdrawIcon.svg";
import reStakeIcon from "../assets/myEarnings/reStakeIcon.svg";
import ButtonDashboard from "../components/ButtonDashboard";
import { getProfitsUserAllSources, getProfitsUserPlans,withdrawDepositProfitAll } from "../contract/methos";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const MyEarnings = () => {
  const { t } = useTranslation("");
  const { address } = useAccount();

  const [profitPlans, setProfitPlans] = useState({});
  const [profitFromAllSources, setProfitFromAllSources] = useState({});
  let personalVolumen = 0;
  let directReferrals = 0;
  let range = 0;
  let cutDay = 0;
  let teamVolumen = 0;
  let myTeam = 0;
  let monthlyResidual = 0;
  let passiveIncome = 0;
  let residualIncome = 0;
  let expiredPlans = 0;
  let availableToWithdraw = 0;
  let totalWithdraw = 0;
  let reStake = 0;

  const infoMyEarnings = [
    {
      name: t("Personal Volumen"),
      amount: personalVolumen,
    },
    {
      name: t("Direct referrals"),
      amount: directReferrals,
    },
    {
      name: t("Range"),
      amount: range,
    },
    {
      name: t("Cut day"),
      amount: cutDay,
    },
  ];

  const infoMyEarnings2 = [
    {
      name: t("Team volumen"),
      amount: teamVolumen,
    },
    {
      name: t("Mi equipo"),
      amount: myTeam,
    },
    {
      name: t("Monthly residual"),
      amount: monthlyResidual,
    },
  ];

  const infoButtons = [
    profitPlans,
    {
      img: residualIcon,
      name: t("Residual income"),
      amount: residualIncome,
      nameButton: t("Withdraw"),
      withdraw: ()=> {}
    },
    {
      img: expiredIcon,
      name: t("Expired plans"),
      amount: expiredPlans,
      nameButton: t("Withdraw"),
      withdraw: ()=> {}
    },
  ];

  const infoButtons2 = [
    profitFromAllSources,
    {
      img: reStakeIcon,
      name: t("Re-stake"),
      amount: reStake,
      nameButton: t("Stake"),
    },
  ];

  useEffect(() => {
     async function profitPlans(params) {
      const profitFromPlans = await getProfitsUserPlans(address)
      const profitFromAllSources = await getProfitsUserAllSources(address)
      setProfitPlans({
        amount: profitFromPlans.toFixed(3),
        img: pasiveIcon,
        name: t("Passive income"),
        nameButton: t("Withdraw"),
        withdraw: ()=>  withdrawDepositProfitAll(address)
      })
      setProfitFromAllSources({
        img: totalWIcon,
        name: t("Total withdrawal"),
        amount: profitFromAllSources.toFixed(3),
        nameButton: t("Withdraw"),
        withdraw: ()=> {}
      })
      console.log({profitFromPlans},"aaaa")
    }
    profitPlans(address)
  }, []);


  return (
    <div className="page-myEarnings">
      <ButtonDashboard />
      <h1>{t("Mis Ganancias")}</h1>
      <div className="container-up-personalVolumen row">
        <div className="col-6 p-0">
          <div className="container-izq h-100">
            {infoMyEarnings.map((info, index) => {
              return (
                <div className="container" key={index}>
                  <div className="container-tittles">
                    <p>{info.name}</p>
                  </div>
                  <div className="container-amounts">
                    <p>$ {info.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-6 p-0">
          <div className="container-der h-100">
            {infoMyEarnings2.map((info, index) => {
              return (
                <div className="container" key={index}>
                  <div className="container-tittles">
                    <p>{info.name}</p>
                  </div>
                  <div className="container-amounts">
                    <p>$ {info.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-down-buttons ">
        <div className="container-buttons1 row">
          {infoButtons.map((button, index) => {
            return (
              <div className="col-12 col-lg-4" key={index}>
                <div className="container-blue ">
                  <div className="container-info-amount">
                    <div className="img-tittle">
                      <img src={button.img} alt="icon" />
                      <p>{button.name}</p>
                    </div>
                    <p className="amounts">$ {button.amount}</p>
                  </div>
                  <button onClick={button.withdraw}>{button.nameButton}</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="container-buttons2 row">
          <div className="container-blue-light ">
            <p>{t("Available to withdraw")}</p>
            <p className="amounts">$ {availableToWithdraw}</p>
          </div>
        </div>

        <div className="container-buttons3 row">
          {infoButtons2.map((button, index) => {
            return (
              <div className="col-12 col-lg-6" key={index}>
                <div className="container-turquesa">
                  <div className="container-info-amount">
                    <div className="img-tittle">
                      <img src={button.img} alt="icon" />
                      <p>{button.name}</p>
                    </div>
                    <p className="amounts">$ {button.amount}</p>
                  </div>
                  <button>{button.nameButton}</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyEarnings;
