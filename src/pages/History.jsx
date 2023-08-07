import { useTranslation } from "react-i18next";
import searchIcon from "../assets/history/search.svg";
import btnSearchIcon from "../assets/history/bolitaEicon.svg";
import { useState } from "react";
import ButtonDashboard from "../components/ButtonDashboard";
import Modal from "react-modal";
import { ReactComponent as IconClose } from "../assets/contracts/close.svg";

const History = () => {
  Modal.setAppElement("#root");

  const { t } = useTranslation("");

  const [inputValueSearch, setInputValueSearch] = useState("");
  const [data, setData] = useState([
    {
      date: "01-04-2023",
      movement: t("investment"),
      type: t("New contract"),
      amount: "1.000",
      hash: "Dhaisudiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("Passive"),
      amount: "140",
      hash: "asddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("residual"),
      amount: "700",
      hash: "adssddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("Expired plans"),
      amount: "1.000",
      hash: "adssddiu",
    },
    {
      date: "01-04-2023",
      movement: t("investment"),
      type: t("New contract"),
      amount: "1.000",
      hash: "dhaisudiu",
    },
    {
      date: "01-04-2023",
      movement: t("investment"),
      type: t("New contract"),
      amount: "1.000",
      hash: "dhaisudiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("Passive"),
      amount: "140",
      hash: "asddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("residual"),
      amount: "700",
      hash: "adssddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("Expired plans"),
      amount: "1.000",
      hash: "adssddiu",
    },
    {
      date: "01-04-2023",
      movement: t("investment"),
      type: t("New contract"),
      amount: "1.000",
      hash: "dhaisudiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("Passive"),
      amount: "140",
      hash: "asddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("residual"),
      amount: "700",
      hash: "adssddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("Expired plans"),
      amount: "1.000",
      hash: "adssddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("Passive"),
      amount: "140",
      hash: "asddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("residual"),
      amount: "700",
      hash: "adssddiu",
    },
    {
      date: "01-04-2023",
      movement: t("Withdrawal"),
      type: t("Expired plans"),
      amount: "1.000",
      hash: "adssddiu",
    },
  ]);

  const [modalIsOpenPlan, setModalIsOpenPlan] = useState(false);

  function handledModalHistory() {
    console.log("aaaaaaaaa");
    setModalIsOpenPlan(!modalIsOpenPlan);
  }

  const handleInput = (event) => {
    let searchValue = event.target.value;
    searchValue.toLowerCase();
    setInputValueSearch(searchValue);
  };

  function filterForHash(item) {
    if (inputValueSearch === "") return true;
    else {
      let hash = item.hash.toLowerCase();
      return hash.includes(inputValueSearch);
    }
  }

  return (
    <>
      <div className="page-history">
        <ButtonDashboard />
        <div className="container-search-btn">
          <div className="container-input-search">
            <input
              type="text"
              placeholder={t("Search")}
              onChange={handleInput}
            />
            <img src={searchIcon} alt="" />
          </div>
          <div className="btn-search-icon">
            <img src={btnSearchIcon} alt="" onClick={handledModalHistory} />
          </div>
        </div>
        <div className="container-scroll">
          <div className="container-info">
            <div className="container-tittles">
              <p className="date">{t("Date")}</p>
              <p className="movement">{t("movement")}</p>
              <p className="type">{t("Type")}</p>
              <p className="amount">{t("Amount")}</p>
              <p className="hash">{t("Hash")}</p>
            </div>

            <div className="container-map-info">
              {data.filter(filterForHash).map((info, index) => {
                return (
                  <div className="container-data" key={index}>
                    <p className="date">{info.date}</p>
                    <p className="movement">{info.movement}</p>
                    <p className="type">{info.type}</p>
                    <p className="amount">$ {info.amount}</p>
                    <p className="hash">{info.hash}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpenPlan}
        contentLabel="Example Modal"
        className="container-modalHistory"
      >
        <div className="container-icon-closer">
          <IconClose fill="#D9D9D9" onClick={handledModalHistory} />
        </div>
        <div className="modal-planes-history">
          <h6 className="title-modal-history">{t("Filter by")}</h6>
          <div className="row container-date-start-end border-buttom-aux-history m-0">
            <div className="col-6 p-0">
              <div className="date-start">
                <label htmlFor="">{t("dateStart")}</label>
                <input className="input-type1" type="date" name="" id="" />
              </div>
            </div>
            <div className="col-6 p-0">
              <div className="date-end">
                <label htmlFor="">{t("dateEnd")}</label>
                <input className="input-type1" type="date" name="" id="" />
              </div>
            </div>
          </div>
          <div className="row container-checkbox-father border-buttom-aux-history">
            <h5 className="title-checkbox">{t("movement")}</h5>
            <div className="container-select-with-checkbox">
              <p>{t("investment")}</p>
              <input type="checkbox" />
            </div>
            <div className="container-select-with-checkbox">
              <p>{"Withdrawal"}</p>
              <input type="checkbox" />
            </div>
          </div>
          <div className="row container-checkbox-father border-buttom-aux-history">
            <h5 className="title-checkbox">{t("Type")}</h5>
            <div className="container-select-with-checkbox">
              <p>{t("New contract")}</p>
              <input type="checkbox" />
            </div>
            <div className="container-select-with-checkbox">
              <p>{t("Passive")}</p>
              <input type="checkbox" />
            </div>
            <div className="container-select-with-checkbox">
              <p>{t("residual")}</p>
              <input type="checkbox" />
            </div>
            <div className="container-select-with-checkbox">
              <p>{t("Expired plans")}</p>
              <input type="checkbox" />
            </div>
          </div>
          <div className="row container-amount">
            <h5 className="title-amount">{t("Amount")}</h5>
            <div className="col-6 p-0">
              <div className="range-max">
                <label htmlFor="">{t("Range Max")}</label>
                <input className="input-type1" type="text" name="" id="" />
              </div>
            </div>
            <div className="col-6 p-0">
              <div className="range-min">
                <label htmlFor="">{t("Range Min")}</label>
                <input className="input-type1" type="text" name="" id="" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default History;
