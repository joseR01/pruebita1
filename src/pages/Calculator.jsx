import { useTranslation } from "react-i18next";
import workIcon from "../assets/img/rafiki.png";
import Modal from "react-modal";
import { useState } from "react";
import { ReactComponent as IconClose } from "../assets/contracts/close.svg";
import ButtonDashboard from "../components/ButtonDashboard";
Modal.setAppElement("#root");

const Calculator = () => {
  const { t } = useTranslation("");

  const [modalIsOpenItWork, setModalIsOpenItWork] = useState(false);
  const handlerModalItWork = () => setModalIsOpenItWork(!modalIsOpenItWork);

  // estados de la calculadora
  const [frontLine, setFrontLine] = useState(0);
  const [personalStaking, setPersonalStaking] = useState(0);
  const [matix, setMatix] = useState(0);
  const [averageStaking, setAverageStaking] = useState(0);

  let earningsPerMonth = 0;
  let earningsPerYear = 0;

  const data = [
    {
      level: `${t("nivel")} 1`,
      totalTeam: 0,
      stakeLevel: 0,
      totalStake: 0,
      totalResidual: 0,
    },
    {
      level: `${t("nivel")} 2`,
      totalTeam: 0,
      stakeLevel: 0,
      totalStake: 0,
      totalResidual: 0,
    },
    {
      level: `${t("nivel")} 3`,
      totalTeam: 0,
      stakeLevel: 0,
      totalStake: 0,
      totalResidual: 0,
    },
    {
      level: `${t("nivel")} 4`,
      totalTeam: 0,
      stakeLevel: 0,
      totalStake: 0,
      totalResidual: 0,
    },
    {
      level: `${t("nivel")} 5`,
      totalTeam: 0,
      stakeLevel: 0,
      totalStake: 0,
      totalResidual: 0,
    },
  ];

  const infoModal = [
    {
      parrafo1: t("Stalkeando"),
      inputValue: `$ 1.000`,
      parrafo2: t("Personal"),
    },
    {
      parrafo1: t("Invites"),
      inputValue: 20,
      parrafo2: t("leaders"),
    },
    {
      parrafo1: t("To Invite"),
      inputValue: 3,
      parrafo2: t("leaders"),
    },
    {
      parrafo1: t("That they invest from"),
      inputValue: `$ 500`,
      parrafo2: t("average each"),
    },
    {
      parrafo1: t("With team of"),
      inputValue: `$ 2.420`,
      parrafo2: t("leaders"),
    },
    {
      parrafo1: t("You unlock the"),
      inputValue: 5,
      parrafo2: t("levels"),
    },
    {
      parrafo1: t("With a volume"),
      inputValue: `$ 1.210.000`,
      parrafo2: t("in all your network"),
    },
  ];

  return (
    <div className="page-calculator">
      <ButtonDashboard />
      <div className="row">
        <div className="col-8 col-lg-5 order-lg-1 px-1">
          <div className="container-configure-your-network mx-lg-1">
            <h5 className="title-configure">{t("Configure Your Network")}</h5>
            <div className="container-configure-first row">
              <div className="col-6 p-1 p-lg-1">
                <label className="form-label">{t("Front line")}</label>
                <input
                  className="input-type1"
                  type="text"
                  value={frontLine}
                  onChange={(event) => setFrontLine(event.target.value)}
                />
              </div>
              <div className="col-6 p-1 p-lg-1">
                <label className="form-label">
                  {t("Your personal staking")}
                </label>
                <input
                  className="input-type1"
                  type="text"
                  value={personalStaking}
                  onChange={(event) => setPersonalStaking(event.target.value)}
                />
              </div>
            </div>
            <div className="container-configure-second row">
              <div className="col-6 p-1 p-lg-1">
                <label className="form-label">{t("Matrix")}</label>
                <input
                  className="input-type1"
                  type="text"
                  value={matix}
                  onChange={(event) => setMatix(event.target.value)}
                />
              </div>
              <div className="col-6 p-1 p-lg-1">
                <label className="form-label">{t("Average staking")}</label>
                <input
                  className="input-type1"
                  type="text"
                  value={averageStaking}
                  onChange={(event) => setAverageStaking(event.target.value)}
                />
              </div>
              <div className="col-12 mt-2">
                <button className="wallet-btn fw-normal mx-auto">
                  {t("Calculate")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3 order-lg-2 order-3 my-2 my-lg-0 p-0">
          <div className="container-profits mx-lg-3">
            <h5 className="title-profits">{t("Profits")}</h5>
            <div className="container-profits-for-time">
              <div>
                <p className="title">{t("Earnings per Month")}</p>
                <p className="value">{`$ ${earningsPerMonth}`}</p>
              </div>
              <div>
                <p className="title">{t("Earnings per Year")}</p>
                <p className="value">{`$ ${earningsPerYear}`}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-4 col-lg-4 order-lg-3 px-1"
          onClick={handlerModalItWork}
        >
          <div className="container-how-work mx-lg-1">
            <h2>{t("¿How does it work?")}</h2>
            <img src={workIcon} alt="" />
          </div>
        </div>
        <Modal
          isOpen={modalIsOpenItWork}
          contentLabel="Example Modal"
          className="container-modalHowDoesItWork"
        >
          <div className="container-icon-closer">
            <IconClose
              width={"100%"}
              fill="#D9D9D9"
              onClick={handlerModalItWork}
            />
          </div>
          <div className="modal-planes-calculator">
            <h6 className="title-modal-stake">{t("¿How does it work?")}</h6>
            <div className="container-info">
              {infoModal.map((info, index) => {
                return (
                  <div className="container-map-info" key={index}>
                    <p className="parrafo1">{info.parrafo1}</p>
                    <input type="text" value={info.inputValue} />
                    <p className="parrafo2">{info.parrafo2}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
      <div className="row">
        <div className="container-info mx-lg-1 mt-lg-3">
          <div className="container-tittles">
            <p className="nivel">{t("nivel")}</p>
            <p className="totalTeam">{t("Total Team")}</p>
            <p className="stakeLevel">{t("Stake Level")}</p>
            <p className="totalStaked">{t("totalStaked")}</p>
            <p className="totalResidual d-none d-lg-block">
              {t("Total Residual")}
            </p>
          </div>

          <div className="container-map-info">
            {data.map((info, index) => {
              return (
                <div className="container-data" key={index}>
                  <p className="nivel">{info.level}</p>
                  <p className="totalTeam">{info.totalTeam}</p>
                  <p className="stakeLevel">$ {info.stakeLevel}</p>
                  <p className="totalStaked">$ {info.totalStake}</p>
                  <p className="totalResidual d-none d-lg-block">
                    $ {info.totalResidual}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
