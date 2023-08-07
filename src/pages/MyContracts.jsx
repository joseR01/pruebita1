import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import TimerCounter from "../components/TimerCounter";
import { ReactComponent as IconClose } from "../assets/contracts/close.svg";

// importaciones para los modales
import Modal from "react-modal";
import ButtonDashboard from "../components/ButtonDashboard";
import { getListDepositUserPlans, getUserPlanId } from "../contract/methos";
import { useAccount } from "wagmi";
import { URLApi } from "../utilities/networks";
import axios from "axios";
import moment from "moment";

Modal.setAppElement("#root");

const MyContracts = () => {
  const { t, i18n } = useTranslation("");

  const targetDate = new Date("2023-06-15");
  const { address } = useAccount();

  const listPlanServer = [
    {
      id: 1,
      isActive: true,
      plan: `${t("plan")} 1`,
      fechaInit: ["1/4/2023", "1/10/2023"],
      time: 6,
      amount: 1000,
      daily: 1,
      totalRoi: 180,
      typePlan: "Simple",
    },
    {
      id: 2,
      isActive: true,
      plan: `${t("plan")} 2`,
      fechaInit: ["1/4/2023", "1/10/2023"],
      time: 6,
      amount: 1000,
      daily: 1,
      totalRoi: 180,
      typePlan: "Compound",
    },
    {
      id: 3,
      isActive: true,
      plan: `${t("plan")} 3`,
      fechaInit: ["1/4/2023", "1/10/2023"],
      time: 6,
      amount: 1000,
      daily: 1,
      totalRoi: 180,
      typePlan: "Progresive",
    },
  ];
  const [listPlan, setListPlan] = useState([]);
  const [modalIsOpenPlan, setModalIsOpenPlan] = useState(false);
  const [planSelected, setPlanSelected] = useState();

  useEffect(() => {
    // console.log(i18n);
    // obtenerLosPlanesDelUser(address);
    getMyPlansDB()
  }, [i18n.language]);

  async function getMyPlansDB() {
    try {
      const response = await axios.get(URLApi + '/api/v1/plan/my-plans');
      const myPlans = response.data.user.userPlans
      console.log({myPlans},'----------------------')
      let plan = myPlans.map((planes, index) => {
        const fecha = ()=>{
          // Creamos un objeto Moment utilizando Moment.js
          const fechaMoment = moment( Number(planes.creationTime) * 1000);
          const fechaFormateadaInit = fechaMoment.format("D/M/YYYY");
  
          const fechaSumada = fechaMoment.add(360, 'days');
          // Formateamos la fecha en el formato deseado
          const fechaFormateadaFinal = fechaSumada.format("D/M/YYYY");
    
          const partesFechaInit = fechaFormateadaInit.split("/");
          const partesFechaEnd = fechaFormateadaFinal.split("/");
          // Formatear la fecha en el nuevo formato "yyyy-m-d"
          const fechaFormateInit = `${partesFechaInit[2]}-${partesFechaInit[1]}-${partesFechaInit[0]}`;
          const fechaFormateEnd = `${partesFechaEnd[2]}-${partesFechaEnd[1]}-${partesFechaEnd[0]}`;
  
          return [fechaFormateadaInit,fechaFormateadaFinal,fechaFormateInit,fechaFormateEnd];
        }
        const fechas = fecha()
        return {
          id: planes.myPlanContractId,
          isActive: true,
          plan: `${t("plan")} ${planes.myPlanContractId}`,
          fechaInit: fechas[0],
          fechaEnd: fechas[1],
          fechaInit2: fechas[2],
          fechaEnd2: fechas[3],
          time: Number(planes.plan.period)/86400/30,
          simple: planes.plan.isSimple,
          progressive: planes.plan.isProgressive,
          compound: planes.plan.isCompound,
          typeOfPlan: planes.plan.isSimple && "simple" || planes.plan.isProgressive && "progressive" || planes.plan.isCompound && "compound",
          amount: planes.plan.roiNumber / 12,
          daily: planes.plan.roiNumber / 360,
          totalRoi: planes.plan.roiNumber,
        };
      });
      console.log({plan},'construyendo el objeto')

      setListPlan(plan);
    } catch (error) {
      console.log(error)
    }
  }
  //esta funcion es para obtener los datos desde el contraoto
  async function obtenerLosPlanesDelUser(address) {
    try {
      const planesUserIds = await getUserPlanId(address);
      if (!Array.isArray(planesUserIds) || planesUserIds.length < 1) return;
      const planesUser = await getListDepositUserPlans(planesUserIds);
      console.log({ planesUser });

      let plan = planesUser.map((planes, index) => {
        return {
          id: planes.planId,
          isActive: true,
          plan: `${t("plan")} ${planes.planId}`,
          fechaInit: planes.fecha[0],
          fechaEnd: planes.fecha[1],
          fechaInit2: planes.fecha[2],
          fechaEnd2: planes.fecha[3],
          time: planes.time,
          amount: planes.AmountConverted,
          daily: planes.ProfitConverted / 30,
          totalRoi: planes.ProfitConverted,
        };
      });
      setListPlan(plan);

      return planesUser;
    } catch (error) {
      console.log({ error });
    }
  }

  const handlerModalPlan = (planID) => {
    let IndexPlan = listPlan.findIndex((element) => element.id === planID);
    let getElementPlan = listPlan[IndexPlan];
    setPlanSelected(getElementPlan);
    setModalIsOpenPlan(!modalIsOpenPlan);
  };

  function handleButtonCanceled(planID) {
    let listPlanAux = [...listPlan];
    let IndexPlan = listPlanAux.findIndex((element) => element.id === planID);
    let getElementPlan = listPlanAux[IndexPlan];
    getElementPlan.isActive = false;
    listPlanAux.splice(IndexPlan, 1, getElementPlan);
    setListPlan(listPlanAux);
    setModalIsOpenPlan(!modalIsOpenPlan);
  }

  return (
    <>
      <div className="page-myContracts">
        <ButtonDashboard />
        <h1 className="title-page">{t("myPlans")}</h1>
        <div className="d-flex w-100">
          <div className="myContracts-card row w-100">
            {listPlan.length < 1 ? (
              <h3 className="mt-5 text-center">{t("Aun no tienes un plan")}</h3>
            ) : (
              listPlan.map((plan) => (
                <div className="col-12 col-sm-6 col-md-4" key={plan.plan}>
                  <div className="container-my-plan">
                    <div className="container-header-plan">
                      <h5 className="title-plan">{plan.plan}</h5>
                      {!!plan.isActive ? (
                        <div className="wallet-btn --bgGreenBtn">
                          {t("active")}
                        </div>
                      ) : (
                        <div className="wallet-btn --bgGrayBtn">
                          {t("Finished")}
                        </div>
                      )}
                      <div
                        className={`${
                          plan.typeOfPlan === "simple"
                            ? "container-typePlan"
                            : plan.typeOfPlan === "progressive"
                            ? "container-typePlan --bg-progresivo"
                            : "container-typePlan --bg-compuesto"
                        }`}
                      >
                        <p>{plan.typeOfPlan  === "simple" && t("simple") || plan.typeOfPlan === "progressive" && t("progresivo") || plan.typeOfPlan ===  "compound" && t("compuesto")}</p>
                      
                      </div>
                    </div>
                    <div className="container-fecha-plan d-flex justify-content-between">
                      <p>
                        <b>{t("inicio")}:</b> {plan.fechaInit}
                      </p>
                      <p>
                        <b>{t("finaliza")}:</b> {plan.fechaEnd}
                      </p>
                    </div>
                    <div className="container-datos">
                      <p className="text">{t("staking")}</p>
                      <p className="value">$ {plan.amount}</p>
                    </div>
                    <div className="container-datos">
                      <p className="text">{t("Time")}</p>
                      <p className="value">
                        {plan.time} {t("meses")}
                      </p>
                    </div>
                    <div className="container-datos">
                      <p className="text">
                        {t("Daily")} / {t("Total ROI")}
                      </p>
                      <p className="value">
                        ${plan.daily.toFixed(3)} / ${plan.totalRoi}
                      </p>
                    </div>
                    <TimerCounter
                      styles={{ fontSize: "TimerCounter" }}
                      timeEnd={plan.fechaEnd2}
                    />
                    {/* <div className="d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-outline-danger fw-bol buton-cancelar"
                      onClick={() => handlerModalPlan(plan.id)}
                    >
                      {t("Cancel plan")}
                    </button>
                  </div> */}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpenPlan}
        contentLabel="Example Modal"
        className="modal-my-contracts"
      >
        <div className="container-icon-closer">
          <IconClose fill="#D9D9D9" onClick={handlerModalPlan} />
        </div>
        <div className="modal-planes-stake">
          <h6 className="title-modal-stake">{planSelected?.plan}</h6>
          <div className="content-plan-modal">
            <h6 className="title">
              {t("The amount to be received for cancellation is")}
            </h6>
            <input className="input-type1 --stylesInput" type="text" />
            <p className="mas-detalles">{t("View penalty details")}</p>
          </div>
          <div className="botones-modal-plan mt-4">
            <button
              className="btn wallet-btn fw-normal --buttonDimesiones"
              onClick={() => handleButtonCanceled(planSelected?.id)}
            >
              {t("confirmar")}
            </button>
            <button
              className="btn btn-outline-danger fw-bold --buttonDimesiones"
              onClick={handlerModalPlan}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyContracts;
