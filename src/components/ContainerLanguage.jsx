import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EspañolBand from "../assets/banderas/es1.png";
import InglesBand from "../assets/banderas/en1.png";
import ChinoBand from "../assets/banderas/zh1.png";
import RusoBand from "../assets/banderas/rus1.png";
import ArabeBand from "../assets/banderas/ar1.png";
import { useLocation } from "react-router-dom";

const ContainerLanguage = ({ styles = {} }) => {
  const { pathname } = useLocation();

  const [isOpenMenuLanguage, setIsOpenMenuLanguage] = useState(false);
  function openMenuLanguage() {
    setIsOpenMenuLanguage(!isOpenMenuLanguage);
  }
  const { i18n } = useTranslation("");

  function changeLanguage(type) {
    localStorage.setItem("language", type);
    i18n.changeLanguage(type);
  }
  // console.log(i18n)
  const languageList = [
    {
      name: "es",
      type: "es",
      img: EspañolBand,
    },
    {
      name: "en",
      type: "en",
      img: InglesBand,
    },
    {
      name: "zh",
      type: "zh",
      img: ChinoBand,
    },
    {
      name: "ru",
      type: "ru",
      img: RusoBand,
    },
    {
      name: "ar",
      type: "ar",
      img: ArabeBand,
    },
  ];

  let ImagenesObj = {
    es: EspañolBand,
    en: InglesBand,
    zh: ChinoBand,
    ru: RusoBand,
    ar: ArabeBand,
  };

  const { iconWorld = "" } = styles;
  return (
    <>
      <div className="container-idiomas">
        <button className="button-idiomas" onClick={openMenuLanguage}>
          <svg
            className={`icon-world ${
              pathname === "/welcome" ||
              pathname === "/welcome" ||
              pathname === "/"
                ? "icon-world"
                : "icon-world-blue"
            } ${styles?.iconWorld}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          {/* <svg
            className={` ${isOpenMenuLanguage ? "iconOpen" : "iconFlecha"}`}
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg> */}
          <div className="boxbandera">
            <img
              src={ImagenesObj[i18n.language]}
              alt=""
              className="imagenBandera"
            />
          </div>
        </button>
        <div
          className={`list-idiomas ${
            isOpenMenuLanguage ? "visible" : "hidden"
          }`}
        >
          <ul>
            {languageList.map((pais, index) => (
              <li
                className="container-bandera"
                key={index}
                onClick={() => {
                  changeLanguage(pais.type);
                  openMenuLanguage();
                }}
              >
                <img src={pais.img} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContainerLanguage;
