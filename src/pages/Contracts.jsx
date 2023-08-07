import { useTranslation } from "react-i18next";
import logoContracts from "../assets/img/Delfin.png";
import { ReactComponent as IconClose } from "../assets/contracts/close.svg";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import ButtonDashboard from "../components/ButtonDashboard";
import {
  getDetailsOfThePlanContract,
  getExistingPlanesContract,
  getListDepositUserPlans,
  getUserPlanId,
  payPlanInContract,
} from "../contract/methos";
import { convertirSegundos } from "../utilities/convertTime";
import DataContext from "../context/useData";
import moment from "moment";
import axios from "axios";
import { URLApi } from "../utilities/networks";
import { useAccount } from "wagmi";
Modal.setAppElement("#root");

const Contracts = () => {
  const { t } = useTranslation("");
  const { userC } = useContext(DataContext);

  const [planes, setPlanes] = useState([]);

  const [modalIsOpenPlan, setModalIsOpenPlan] = useState(false);
  const [modalPayIsConfirmed, setModalPayIsConfirmed] = useState(false);
  const [hashFromTransaction, setHashFromTransaction] = useState("");
  const [erroneousAmountMessage, setErroneousAmountMessage] = useState("");
  const [inputAmountToStaking, setInputAmountToStaking] = useState(0);
  const [getIdTheContract, setGetIdTheContract] = useState(0);
  const [getDatosModalPlan, setGetDatosModalPlan] = useState({
    title: "",
    Amount: {
      title: "",
      value: "",
    },
    daily: {
      title: "",
      value: "",
    },
    monthly: {
      title: "",
      value: "",
    },
    roi: {
      title: "",
      value: "",
    },
    endDay: {
      title: "",
      value: "",
    },
  });
  const { address } = useAccount();

  const handlerModalPlan = () => setModalIsOpenPlan(!modalIsOpenPlan);

  const handlerModalPayConfirmed = async (payPlan) => {
    console.log({ payPlan },'siiiiii');
    if (inputAmountToStaking < payPlan.minDepositConverted) {
      console.log("es menor");
      setErroneousAmountMessage(
        t("el monto a invertir es menor al requerido de este plan")
      );
      setTimeout(() => setErroneousAmountMessage(""), 3000);
      return;
    } else if (inputAmountToStaking > payPlan.maxDepositConverted) {
      setErroneousAmountMessage(
        t("el monto a invertir excede el valor máximo de este plan")
      );
      setTimeout(() => setErroneousAmountMessage(""), 3000);
      return;
    }
    //pagando el plan
    const getHash = await payPlan.payPlan(inputAmountToStaking);
    //despues tenerlos los id de los planes
    const planesUserIds = await getUserPlanId(address)
    const ultimatePlanId = planesUserIds[planesUserIds.length-1]
    //optenemos el plan por su id, que compro el usuario
    const planesUser = await getListDepositUserPlans([ultimatePlanId])

    // console.log({ultimatePlanId},'este es el id que debes buscar')
    // console.log({getIdTheContract,inputAmountToStaking,ultimatePlanId,planesUser},'debe esperar')

    const datosPlan = { 
      planId: Number(getIdTheContract),
      myPlanContractId: Number(ultimatePlanId),
      amount:`${inputAmountToStaking* 10**18}`,
      roi_times_10_000_per_month: `[${planesUser[0].roi_times_10_000_per_month}]`,
      withdrawnAmount: Number(planesUser[0].withdrawnAmount),
      creationTime: Number(planesUser[0].creationTime)
    }
    
    // console.log({datosPlan})
    if(Number(getHash?.status) === 1) {
      try {
        const createPlanDB = await axios.post(URLApi + "/api/v1/plan/my-plans", {
          data: datosPlan
        });
      } catch (error) {
        console.log('no se pudo crear el plan',error)
      }
      setHashFromTransaction(getHash.transactionHash)
      setModalPayIsConfirmed(true)
      setModalIsOpenPlan(false)
    }
  };

  function handleModalData(plan) {
    console.log({ plan }, "salsaaaaaaaaaaaaaaaaaaa");
    setGetIdTheContract(plan.planId)
    setInputAmountToStaking(plan.minDepositConverted);
    setGetDatosModalPlan({
      title: plan.plan,
      Amount: {
        title: t("meses a invertir"),
        value: `${plan.amount}`,
      },
      daily: {
        title: t("Daily profit"),
        value: `${((plan.minDepositConverted * plan.dailyRoi) / 100).toFixed(
          3
        )}$`,
      },
      monthly: {
        title: t("Monthly profit"),
        value: `${((plan.minDepositConverted * plan.monthlyRoi) / 100).toFixed(1)}$`,
      },
      roi: {
        title: t("ROI"),
        value: `${((plan.minDepositConverted * plan.totalRoi) / 100).toFixed(1)}$`,
      },
      endDay: {
        title: t("End day contract"),
        // value: "2024-01-24",
        value: moment().add(360, "days").format("YYYY-MM-DD"),
      },
      payPlan: plan.payPlan,
      minDepositConverted: plan.minDepositConverted,
      maxDepositConverted: plan.maxDepositConverted,
      monthlyRoi:plan.monthlyRoi,
      totalRoi:plan.totalRoi,
      dailyRoi:plan.dailyRoi,

    });
  }

  function handleCalculate(targetElement) {
    // console.log(targetElement.min,targetElement.value)

    setInputAmountToStaking(targetElement.value);
    console.log({
      staking:targetElement.value,
      roi:getDatosModalPlan
    })
    setGetDatosModalPlan({
      ...getDatosModalPlan,
      daily: {
        title: t("Daily profit"),
        value: `${(
          (targetElement.value * getDatosModalPlan.dailyRoi) /
          100
        ).toPrecision(3)}$`,
      },
      monthly: {
        title: t("Monthly profit"),
        value: `${(
          (targetElement.value * getDatosModalPlan.monthlyRoi) /
          100
        )}$`,
      },
      roi: {
        title: t("ROI"),
        value: `${(
          (targetElement.value * getDatosModalPlan.totalRoi) /
          100
        )}$`,
      },
    });
    // console.log(newData)
  }

  useEffect(() => {
    async function fetchPlanes() {
      try {
        const existingPlans = await getExistingPlanesContract();
        const arrayPlan = [];

        // Usamos Promise.all para esperar que todas las promesas se resuelvan
        await Promise.all(
          existingPlans.map(async (plan, index) => {
            const detailsPlan = await getDetailsOfThePlanContract(plan);
            arrayPlan.push({
              ...detailsPlan,
              planId: plan,
              plan: `${t("plan")} ${index + 1}`,
              months: Number(detailsPlan.period) / 86400/ 30,
              minDepositConverted: Math.ceil(
                Number(detailsPlan.minDeposit) / 10 ** 18
              ),
              maxDepositConverted: Math.ceil(
                Number(detailsPlan.maxDeposit) / 10 ** 18
              ),
              dailyRoi: `${(Number(detailsPlan.roiNumber) / 360).toPrecision(2)}`,
              monthlyRoi: Number(detailsPlan.roiNumber) /12 ,
              totalRoi: Number(detailsPlan.roiNumber),
              Time: () => {
                const { dias, horas } = convertirSegundos(
                  Number(detailsPlan.period)
                );
                // console.log({dias,horas})
                return horas !== 0 ? `${dias}d - ${horas}h` : `${dias}d`;
              },
              payPlan: (amountToInverted) => {
                // console.log({amountToInverted},'si le llega amorsito')
                return payPlanInContract(
                  userC.address,
                  userC.referrer.address,
                  Number(amountToInverted),
                  plan
                );
              },
            }); // Agregamos el objeto detailsPlan al array
          })
        );
        console.log({ arrayPlan });
        setPlanes(arrayPlan); // Finalmente, actualizamos el estado con el array de planes
      } catch (error) {
        console.error("Error fetching planes:", error);
      }
    }

    fetchPlanes();
  }, []);

  return (
    <>
      <ButtonDashboard />
      <div className="page-contracts">
        <div className="container-info d-none d-lg-flex">
          <div className="container-tittle-logo">
            <div className="container-plan --moreHeight">
              <img src={logoContracts} alt="logo" />
            </div>
            <div className="container-plan">
              <p>{t("Min Stake")}</p>
            </div>
            <div className="container-plan">
              <p>{t("Max Stake")}</p>
            </div>
            <div className="container-plan">
              <p>{t("Daily")}</p>
            </div>
            <div className="container-plan">
              <p>{t("Monthly")}</p>
            </div>
            <div className="container-plan">
              <p>{t("ROI")}</p>
            </div>
            <div className="container-plan">
              <p>{t("Time")}</p>
            </div>
            <div className="container-plan --border-none --moreHeight"></div>
          </div>

          {planes.map((plan, index) => {
            const { Time } = plan;
            return (
              <div
                className={`${
                  plan.plan === `${t("plan")} 1`
                    ? "container-planes --plan1"
                    : "container-planes"
                }
                `}
                key={index}
              >
                <div className="container-plan --moreHeight">
                  <h2>{plan.plan}</h2>
                </div>

                <div className="container-plan">
                  <p>{plan.minDepositConverted}</p>
                </div>

                <div className="container-plan">
                  <p>{plan.maxDepositConverted}</p>
                </div>

                <div className="container-plan">
                  <p>{plan.dailyRoi}%</p>
                </div>

                <div className="container-plan">
                  <p>{plan.monthlyRoi}%</p>
                </div>

                <div className="container-plan">
                  <p>{plan.totalRoi}%</p>
                </div>
                <div className="container-plan">
                  <p>
                    <Time />
                  </p>
                </div>
                <div className="container-plan --border-none --moreHeight">
                  <button
                    onClick={() => {
                      handleModalData(plan);
                      handlerModalPlan();
                    }}
                  >
                    {t("Stake")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* -----------------------mobile design----------------- */}
      <div className="page-contracts-mobile d-block d-lg-none">
        <div className="container">
          <div className="row">
            {planes.map((plan, index) => {
              const { Time } = plan;

              return (
                <div
                  key={index}
                  className="col-sm-6 col-12 mb-3 d-flex justify-content-center"
                >
                  <div className="card --cardWidth">
                    <div className="card-body">
                      <h5 className="card-title text-center fw-bold">
                        {plan.plan}
                      </h5>
                      <div className="d-flex justify-content-between my-3">
                        <p className="fw-bold">{t("Min Stake")}</p>
                        <p>{plan.minDepositConverted} $</p>
                      </div>
                      <div className="d-flex justify-content-between my-3">
                        <p className="fw-bold">{t("Max Stake")}</p>
                        <p>{plan.maxDepositConverted} $</p>
                      </div>
                      <div className="d-flex justify-content-between my-3">
                        <p className="fw-bold">{t("Daily")}</p>
                        <p>{plan.dailyRoi}%</p>
                      </div>
                      <div className="d-flex justify-content-between my-3">
                        <p className="fw-bold">{t("Monthly")}</p>
                        <p>{plan.monthlyRoi}%</p>
                      </div>
                      <div className="d-flex justify-content-between my-3">
                        <p className="fw-bold">{t("ROI")}</p>
                        <p>{plan.totalRoi}%</p>
                      </div>
                      <div className="d-flex justify-content-between my-3">
                        <p className="fw-bold">{t("Time")}</p>
                        <p>
                          <Time />
                        </p>
                      </div>
                      <div className="container-plan --border-none">
                        <button
                          onClick={() => {
                            handleModalData(plan);
                            handlerModalPlan();
                          }}
                        >
                          {t("Stake")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpenPlan}
        contentLabel="Example Modal"
        className="container-contracts"
      >
        <div className="container-icon-closer">
          <IconClose width={"100%"} fill="#D9D9D9" onClick={handlerModalPlan} />
        </div>
        <div className="modal-planes-contracts">
          <h6 className="title-modal-stake">{getDatosModalPlan.title}</h6>
          <div className="amount-container">
            <p>
              {/* {getDatosModalPlan.Amount.title} */}
              {t("staking")}
            </p>
            <input
              className="input-type1 w-25"
              type="number"
              value={inputAmountToStaking}
              onChange={(event) => handleCalculate(event.target)}
              max={getDatosModalPlan.maxDepositConverted}
              min={getDatosModalPlan.minDepositConverted}
            />
          </div>
          <div className="row containerAux">
            <div className="col-12 col-md-6">
              <label className="form-label">
                {getDatosModalPlan.daily.title}
              </label>
              <input
                className="input-type1"
                type="text"
                value={getDatosModalPlan.daily.value}
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">
                {getDatosModalPlan.monthly.title}
              </label>
              <input
                className="input-type1"
                type="text"
                value={getDatosModalPlan.monthly.value}
                readOnly
              />
            </div>
          </div>
          <div className="row containerAux">
            <div className="col-12 col-md-6">
              <label className="form-label">
                {getDatosModalPlan.roi.title}
              </label>
              <input
                className="input-type1"
                type="text"
                value={`${getDatosModalPlan.roi.value}`}
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">
                {getDatosModalPlan.endDay.title}
              </label>
              <input
                className="input-type1"
                type="date"
                value={getDatosModalPlan.endDay.value}
                readOnly
              />
            </div>
          </div>
          <p className="text-danger text-center mt-4">
            {erroneousAmountMessage}
          </p>

          <div className="botones-modal-plan mt-4">
            <button
              className="wallet-btn fw-normal"
              onClick={() => {
                handlerModalPayConfirmed(getDatosModalPlan);
                console.log("mamacoco", getDatosModalPlan.payPlan);
              }}
            >
              {t("Stake")}
            </button>
            <button
              className="btn btn-outline-danger rounded fw-bold"
              onClick={handlerModalPlan}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalPayIsConfirmed}
        contentLabel="Example Modal"
        className="container-contracts"
      >
        <div className="container-icon-closer">
          <IconClose
            width={"100%"}
            fill="#D9D9D9"
            onClick={()=>setModalPayIsConfirmed(false)}
          />
        </div>
        <div className="modal-planes-contracts">
          <h6 className="title-modal-confirmed">{t("Stake confirmed")}</h6>
          <div className="amount-container">
            {/* <h6 className="title-numero-plan">{`${t("plan")} 4`} </h6> */}
            <p className="fw-bold">{t("investment")}</p>
            <input
              className="input-type1 w-25"
              type="text"
              value={inputAmountToStaking}
              readOnly
            />
          </div>
          <div className="hash-container row">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <label className="form-label me-2">{t("Hash")}</label>
              <input
                className="input-type1"
                type="text"
                value={hashFromTransaction}
                readOnly
              />
            </div>
          </div>
          {/* <div className="date-container row">
            <div className="col-12 col-md-6">
              <label className="form-label">{t("Data start")}</label>
              <input
                className="input-type1"
                type="date"
                value={getDatosModalPlan.endDay.value}
                readOnly
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">{t("Data end")}</label>
              <input
                className="input-type1"
                type="date"
                value={getDatosModalPlan.endDay.value}
                readOnly
              />
            </div>
          </div> */}
          <div className="botones-modal-plan">
            <button className="wallet-btn fw-normal py-2">
              <Link to={"/dashboard"}>{t("dashboardSideBar")}</Link>
            </button>
            <button
              className="wallet-btn fw-normal btn-add-new-plan py-2"
              onClick={()=>setModalPayIsConfirmed(false)}
            >
              {t("Add new plan")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Contracts;
