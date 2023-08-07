import React from "react";
import { useTranslation } from "react-i18next";
import ButtonDashboard from "../components/ButtonDashboard";

const Faq = () => {
  const { t } = useTranslation("");

  const listQuestion = [
    {
      question: t("pregunta1"),
      answer: t("repuesta1"),
    },
    {
      question: t("pregunta2"),
      answer: t("repuesta2"),
    },
    {
      question: t("pregunta3"),
      answer: t("repuesta3"),
    },
    {
      question: t("pregunta4"),
      answer: t("repuesta4"),
    },
    {
      question: t("pregunta5"),
      answer: t("repuesta5"),
    },
    {
      question: t("pregunta6"),
      answer: t("repuesta6"),
    },
    {
      question: t("pregunta7"),
      answer: t("repuesta7"),
    },
    {
      question: t("pregunta8"),
      answer: t("repuesta8"),
    },
    {
      question: t("pregunta9"),
      answer: t("repuesta9"),
    },
    {
      question: t("pregunta10"),
      answer: t("repuesta10"),
    },
    {
      question: t("pregunta11"),
      answer: t("repuesta11"),
    },
    {
      question: t("pregunta12"),
      answer: t("repuesta12"),
    },
    {
      question: t("pregunta13"),
      answer: t("repuesta13"),
    },
    {
      question: t("pregunta14"),
      answer: t("repuesta14"),
    },
    {
      question: t("pregunta15"),
      answer: t("repuesta15"),
    },
    {
      question: t("pregunta16"),
      answer: t("repuesta16"),
    },
    {
      question: t("pregunta17"),
      answer: t("repuesta17"),
    },
  ];

  return (
    <div className="page-faq">
      <ButtonDashboard />
      <h1>{t("FAQ")}</h1>
      {listQuestion.map((info, index) => {
        return (
          <div className="container-preg" key={index}>
            <h2>{info.question}</h2>
            <p>{info.answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
