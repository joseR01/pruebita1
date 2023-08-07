import React from "react";
import { useTranslation } from "react-i18next";

const TerminosYCondiciones = () => {
  const { t } = useTranslation("");

  return (
    <div className="page-terminosYcondiciones ">
      <h1 className="title-avisoLegal text-center fs-5">{t("AVISO LEGAL")}</h1>
      <h1 className="text-center my-3 fs-5">
        {t("TÉRMINOS Y CONDICIONES DE USO")}
      </h1>
      <div className="container-parrafos1 container-global">
        <p>{t("parrafo1Terminos")}</p>
        <p>{t("parrafo1.1Terminos")}</p>
        <p>{t("parrafo1.2Terminos")}</p>
      </div>
      <div className="container-aviso container-global">
        <p className="fw-bold text-decoration-underline">{t("AVISO")}</p>
      </div>
      <div className="container-parrafos2 container-global">
        <p>{t("parrafo2")}</p>
      </div>
      <div className="container-parrafos3 container-global">
        <span>{t("parrafo3")} </span>
        <span className="fw-bold text-decoration-underline">
          {t("parrafo3.1")}
        </span>
        <span> {t("parrafo3.2")} </span>
      </div>
      <div className="container-parrafos4 container-global">
        <h1 className="fw-bold">{t("titulo1")}</h1>
        <p>{t("parrafo4")}</p>
      </div>

      <div className="container-parrafos5 container-global">
        <h1 className="fw-bold">{t("titulo2")}</h1>
        <div className="container-preg-resp">
          <p className="fw-bold">1. {t("parrafo5")}</p>
          <p>{t("parrafo5.1")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">2. {t("parrafo5.2")}</p>
          <p>{t("parrafo5.3")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">3. {t("parrafo5.4")}</p>
          <p>{t("parrafo5.5")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">4. {t("parrafo5.6")}</p>
          <p>{t("parrafo5.7")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">5. {t("parrafo5.8")}</p>
          <p>{t("parrafo5.9")}</p>
        </div>
      </div>

      <div className="container-parrafos6 container-global">
        <h1 className="fw-bold">{t("titulo3")}</h1>
        <p>{t("parrafo6")}</p>
      </div>

      <div className="container-parrafos7 container-global">
        <h1 className="fw-bold">{t("titulo4")}</h1>
        <p>{t("parrafo7")}</p>
        <p>{t("parrafo7.1")}</p>
      </div>

      <div className="container-parrafos8 container-global">
        <h1 className="fw-bold">{t("titulo5")}</h1>
        <p>
          <span>{t("parrafo8")} </span>
          <span className="fw-bold fst-italic text-decoration-underline">
            {t("parrafo8.1")}
          </span>
        </p>
        <p>{t("parrafo8.2")}</p>
      </div>

      <div className="container-parrafos9 container-global">
        <h1 className="fw-bold">{t("titulo6")}</h1>
        <p>{t("parrafo9")}</p>
        <p>{t("parrafo9.1")}</p>
      </div>

      <div className="container-parrafos10 container-global">
        <h1 className="fw-bold">{t("titulo7")}</h1>
        <p>{t("parrafo10")}</p>
        <p>{t("parrafo10.1")}</p>
        <p>{t("parrafo10.2")}</p>
        <p>{t("parrafo10.3")}</p>
        <p>{t("parrafo10.4")}</p>
      </div>

      <div className="container-parrafos11 container-global">
        <h1 className="fw-bold">{t("titulo8")}</h1>
        <div className="container-preg-resp">
          <p className="fw-bold">{t("parrafo11")}</p>
          <p>{t("parrafo11.1")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">{t("parrafo11.2")}</p>
          <p>{t("parrafo11.3")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">{t("parrafo11.4")}</p>
          <p>{t("parrafo11.5")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">{t("parrafo11.6")}</p>
          <p>{t("parrafo11.7")}</p>
          <p>{t("parrafo11.8")}</p>
          <p>{t("parrafo11.9")}</p>
          <p>{t("parrafo11.10")}</p>
          <p>{t("parrafo11.11")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">{t("parrafo11.12")}</p>
          <p>{t("parrafo11.13")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">{t("parrafo11.14")}</p>
          <p>{t("parrafo11.15")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">{t("parrafo11.16")}</p>
          <p>{t("parrafo11.17")}</p>
        </div>
        <div className="container-preg-resp">
          <p className="fw-bold">{t("parrafo11.18")}</p>
          <p>{t("parrafo11.19")}</p>
        </div>
      </div>

      <div className="container-parrafos12 container-global">
        <h1 className="fw-bold">{t("titulo9")}</h1>
        <p>{t("parrafo12")}</p>
        <p>{t("parrafo12.1")}</p>
        <p>{t("parrafo12.2")}</p>
      </div>

      <div className="container-parrafos13 container-global">
        <h1 className="fw-bold">{t("titulo10")}</h1>
        <p>{t("parrafo13")}</p>
      </div>

      <div className="container-parrafos14 container-global">
        <h1 className="fw-bold">{t("titulo11")}</h1>
        <p>{t("parrafo14")}</p>
      </div>

      <div className="button-dercargar">
        <a href="http://localhost:3000//TerminosYCondiciones.pdf" download>
          {t("descargarTerminos")}
        </a>
      </div>
    </div>
  );
};

export default TerminosYCondiciones;
