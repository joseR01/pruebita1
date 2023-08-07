import React, { useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const TimerCounter = ({ styles, timeEnd="2023-09-05" }) => {
  const [countdown, setCountdown] = useState("");
  const { t } = useTranslation("");
  // console.log(timeEnd)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const duration = moment.duration(
        moment(new Date(timeEnd)).diff(now)
      );
      setCountdown({
        dias: Math.floor(duration.asDays()),
        // dias: duration.days(),
        horas: duration.hours(),
        minutos: duration.minutes(),
        segundos: duration.seconds(),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeEnd]);
  return (
    <>
      <div className={`container-fecha ${styles.fontSize}`}>
        <div className="container-dias container-globales-fecha">
          <p className="texto-global">{t("dias")}</p>
          <p className="fecha-global">{countdown.dias}</p>
        </div>
        <div className="container-horas container-globales-fecha">
          <p className="texto-global">{t("horas")}</p>
          <p className="fecha-global">{countdown.horas}</p>
        </div>
        <div className="container-minutos container-globales-fecha">
          <p className="texto-global">{t("minutos")}</p>
          <p className="fecha-global">{countdown.minutos}</p>
        </div>
        <div className="container-segundos container-globales-fecha">
          <p className="texto-global">{t("segundos")}</p>
          <p className="fecha-global">{countdown.segundos}</p>
        </div>
      </div>
    </>
  );
};

export default TimerCounter;
