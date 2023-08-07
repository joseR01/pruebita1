import { useTranslation } from "react-i18next";
import pasiveIcon from "../assets/myEarnings/payments.svg";
import ojitoVisible from "../assets/icons/visibility.svg";
import ButtonDashboard from "../components/ButtonDashboard";

const Scanner = () => {
  const { t } = useTranslation("");

  let totalInOperations = 0;
  let wonTrades = 0;
  let lostTrades = 0;
  let profitTotal = 0;

  const infoScanner = [
    {
      name: t("Total in Operations"),
      amount: `$ ${totalInOperations}`,
    },
    {
      name: t("Won Trades"),
      amount: wonTrades,
    },
    {
      name: t("Lost Trades"),
      amount: lostTrades,
    },
  ];

  const infoTableScanner = [
    {
      id: 1,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
    {
      id: 2,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("LOSER"),
    },
    {
      id: 3,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
    {
      id: 4,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("LOSER"),
    },
    {
      id: 5,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
    {
      id: 1,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
    {
      id: 2,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("LOSER"),
    },
    {
      id: 3,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
    {
      id: 4,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("LOSER"),
    },
    {
      id: 5,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
    {
      id: 1,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
    {
      id: 2,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("LOSER"),
    },
    {
      id: 3,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
    {
      id: 4,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("LOSER"),
    },
    {
      id: 5,
      token: "RKC/BNB",
      purchasePrice: "0.12",
      purchaseHash: ojitoVisible,
      salePrice: 0.24,
      saleHash: ojitoVisible,
      profit: 0.12,
      status: t("WINNER"),
    },
  ];

  return (
    <div className="page-scanner">
      <ButtonDashboard />
      <h1>{t("Scanner Operations")}</h1>
      <div className="container-up-totalInOperations">
        <div className="container-izq">
          {infoScanner.map((info, index) => {
            return (
              <div className="container" key={index}>
                <div className="container-tittles">
                  <p>{info.name}</p>
                </div>
                <div className="container-amounts">
                  <p>{info.amount}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="container-der">
          <div className="container-blue">
            <div className="container-info-amount">
              <img src={pasiveIcon} alt="icon" />
              <p>{t("Profit Total")}</p>
            </div>
            <p className="amounts">$ {profitTotal}</p>
          </div>
        </div>
      </div>

      <div className="container-info">
        <div className="container-tittles">
          <p className="id">ID</p>
          <p className="token">{t("Token")}</p>
          <p className="purchasePrice">{t("Purchase Price")}</p>
          <p className="purchaseHash">{t("Purchase Hash")}</p>
          <p className="salePrice">{t("Sale Price")}</p>
          <p className="saleHash">{t("Sale Hash")}</p>
          <p className="profit">{t("Profit")}</p>
          <p className="statusWidth">{t("status")}</p>
        </div>

        <div className="container-map-info">
          {infoTableScanner.map((info, index) => {
            return (
              <div className="container-data" key={index}>
                <p className="id">{info.id}</p>
                <p className="token">{info.token}</p>
                <p className="purchasePrice">{`${info.purchasePrice} USDT`}</p>
                <div className="purchaseHash">
                  <img src={info.purchaseHash} alt="" />{" "}
                </div>
                <p className="salePrice">{`${info.salePrice} USDT`}</p>
                <div className="saleHash">
                  <img src={info.saleHash} alt="" />{" "}
                </div>
                <p className="profit">{`${info.profit} USDT`}</p>
                <p
                  className={` statusWinner statusWidth ${
                    info.status === `${t("LOSER")}` && "statusWinner --Lost"
                  }`}
                >
                  {info.status}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
