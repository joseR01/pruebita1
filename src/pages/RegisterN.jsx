// inicio imagenes
import flecha from "../assets/icons/flechitaIzq.svg";
import flechaAzul from "../assets/icons/flechaCelesteR.svg";
import imgSponsor from "../assets/icons/iconSponsorCeleste.svg";
import imgWallet from "../assets/icons/iconsWalletSponsorC.svg";
import logoRegister from "../assets/img/Logo_IA_Money_flamasRegister.png";
import imgUser from "../assets/register/icon_user.png";
import imgFullName from "../assets/register/icon_full_name.png";
import imgEmail from "../assets/register/icon_email.png";
import imgbirthday from "../assets/register/icon_birtday.png";
import imgCountry from "../assets/register/icon_country.png";
import imgGender from "../assets/register/icon_gender.png";
// fin imagenes

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import ContainerLanguage from "../components/ContainerLanguage";

//web3 and metamask
import { useAccount } from "wagmi";
import {
  checkIsUserRegistrationKYC,
  getEncryptedDataRegistrationKYC,
  registerUserKYC,
} from "../contract/methos";

import { URLApi, globalCompanyName } from "../utilities/networks";
import axios from "axios";
import DataContext from "../context/useData";
import { getDatosDecryptServer } from "../utilities/requestHttp";

const RegisterN = () => {
  const { t, i18n } = useTranslation("");
  const navigate = useNavigate();
  const { handlerConnection, userC, auth } = useContext(DataContext);
  const { address } = useAccount();
  // console.log({i18n})
  //useState
  const [datosReferral, setDatosReferral] = useState({ name: "", wallet: "" });
  const [datosUser, setDatosUser] = useState({
    name: "",
    userName: "",
    email: "",
    birthdate: "",
    country: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  // const [isRegisterKYC, setIsRegisterKYC] = useState(false);
  const [messageErrorLink, setMessageErrorLink] = useState("");

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralParam = urlParams.get("ref") || urlParams.get("referral");
    if (referralParam) {
      setIsLoading(true);
      setDatosReferral({ ...datosReferral, wallet: referralParam });
      if (auth.isAuthMetamask) handleConections(referralParam, address);
    } else {
      setMessageErrorLink(t("necesitas un link"));
      setIsLoading(false);
    }
  }, [auth, i18n.language]);

  async function verifyIsUserRegistrationInContract(address) {
    try {
      const isRegister = await checkIsUserRegistrationKYC(address);
      console.log({ isRegister }, "userKYC");

      if (isRegister === true) {
        setDatosUser({
          name: userC.name,
          userName: userC.userName,
          email: userC.email,
          birthdate: userC.birthdate,
          country: userC.country,
          gender: userC.gender,
        });
        // setIsRegisterKYC(true);
        return true;
      } else {
        // setIsRegisterKYC(false);
        return false;
      }
    } catch (error) {
      console.log({ error }, "userKYC");
      return false;
    }
  }

  async function verifyIsReferralRegistrationInContract(referralParam) {
    try {
      const isRegister = await checkIsUserRegistrationKYC(referralParam);
      console.log({ isRegister }, "referralKYC");
      if (isRegister === true) {
        let encryptReferral = await getEncryptedDataUserContractKYC(
          referralParam
        );
        const userDeScrypt = await getDatosDecryptServer(atob(encryptReferral));
        console.log({ userDeScrypt }, "referralKYC");
        setDatosReferral({
          wallet: referralParam,
          name: userDeScrypt[0],
        });
        return true;
      } else {
        setDatosReferral({ name: null, wallet: null });
        setMessageErrorLink(t("link incorrecto"));
      }
    } catch (error) {
      console.log({ error }, "referralKYC");
    }
  }

  async function getEncryptedDataUserContractKYC(wallet) {
    const encryptedUser = await getEncryptedDataRegistrationKYC(wallet);
    console.log({ encryptedUser });
    return encryptedUser;
  }

  async function handleConections(referralParam, address) {
    console.log({ referralParam, address }, "[handleConections]");
    await verifyIsUserRegistrationInContract(address);
    await verifyIsReferralRegistrationInContract(referralParam);
    setIsLoading(false);
  }

  async function saveDataServer() {
    try {
      const response = await axios.post(URLApi + "/api/v1/user/register", {
        walletUser: address,
        walletReferrel: datosReferral.wallet,
      });
      if (response.status === 200) {
        handlerConnection(address);
      }
      console.log({ response });
      // navigate("/?referral=234234234234234234");
    } catch (error) {
      console.log({ error });
    }
  }

  async function registerUserInBlockChain(user) {
    const {
      inputName,
      inputUserName,
      inputEmail,
      inputBirthdate,
      inputCountry,
      inputGender,
    } = user;

    const dataUser = [
      inputName,
      inputUserName,
      inputEmail,
      inputBirthdate,
      inputCountry,
      inputGender,
      globalCompanyName
    ];

    try {
      const response = await axios.post(URLApi + "/api/v1/data/encrypt", {
        data: dataUser,
      });

      if (response.status === 200) {
        const userEncrypt = response.data.data;
        console.log({ userEncrypt });
        const receipt = await registerUserKYC(address, userEncrypt);
        console.log({ code: receipt.code });
        // si Metamask devuelve error 100 al registrar en KYC no guardara al usuario en base de datos
        if (receipt.code !== 100) {
          await saveDataServer();
        }
      }
      // console.log({ encrypt: response.data.data });
    } catch (error) {
      console.log({ error });
    }
  }

  const onSubmit = (dataForm) => {
    dataForm.inputReferralLink = datosReferral.wallet;
    const {
      inputName,
      inputUserName,
      inputEmail,
      inputBirthdate,
      inputCountry,
      inputGender,
      checkbox,
      inputReferralLink,
    } = dataForm;

    if (
      inputName &&
      inputUserName &&
      inputEmail &&
      inputBirthdate &&
      inputCountry &&
      inputReferralLink &&
      inputGender &&
      checkbox
    ) {
      registerUserInBlockChain(dataForm);
    }
  };

  return (
    <div className="page-register container-fluit text-white">
      <div className="container-azul-izq">
        <div className="container-logo-register">
          <img src={logoRegister} alt="logo" />
        </div>
      </div>
      {isLoading ? (
        <h2 className="d-flex justify-content-center align-items-center text-primary w-50">
          {t("LOADING")}...
        </h2>
      ) : (
        <div className="container-formulario-der">
          <div className="container-mini-navbar">
            <ContainerLanguage styles={{ iconWorld: "icon-world-blue" }} />
          </div>
          <div className="container-flechita-hello">
            <div className="flecha-hello">
              <img
                className="d-block d-md-none"
                src={flecha}
                alt=""
                onClick={() => navigate("/")}
              />
              <img
                className="d-none d-md-block"
                src={flechaAzul}
                alt=""
                onClick={() => navigate("/")}
              />
              <div>
                <h1>{t("hello")}</h1>
                <p>{t("sign up")}</p>
              </div>
            </div>
          </div>
          <div className=" container-sponsor">
            <p className="sponsor fw-bold">{t("My sponsor")}</p>
            <div className="container-name-sponsor">
              <img src={imgSponsor} alt="" />
              <p className="name-sponsor2">{datosReferral.name}</p>
            </div>
            <div className="container-wallet-sponsor">
              <img src={imgWallet} alt="" />
              <p className="wallet-sponsor2">{datosReferral.wallet}</p>
            </div>
          </div>
          <div className="container-form">
            {!datosReferral.wallet ? (
              <h3 className="text-danger text-center">{messageErrorLink}</h3>
            ) : datosUser.name ? (
              //form onlyRead
              <form
                className="formulario d-flex flex-column align-items-center"
                onSubmit={(event) => {
                  event.preventDefault();
                  saveDataServer();
                }}
              >
                <div className="container-info-form mb-3 d-flex">
                  <div className="container-label-input d-flex">
                    <div className="container1-info">
                      <div className="container-user container-global">
                        <div className="d-flex position-relative">
                          <img src={imgUser} alt="" />
                          <input
                            type="text"
                            className="form-control"
                            id="inputUserName"
                            value={datosUser.userName}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="container-email container-global">
                        <div className="d-flex position-relative">
                          <img src={imgEmail} alt="" />
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder={t("email")}
                            value={datosUser.email}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="container-country container-global">
                        <div className="d-flex position-relative">
                          <img src={imgCountry} alt="" />
                          <input
                            type="text"
                            id="inputCountry"
                            className="inputCountry form-control"
                            value={datosUser.country}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="container2-info">
                      <div className="container-FullName container-global">
                        <div className="d-flex position-relative">
                          <img src={imgFullName} alt="" />
                          <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            value={datosUser.name}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="container-birthday container-global">
                        <div className="d-flex position-relative">
                          <img src={imgbirthday} alt="" />
                          <input
                            className="inputBirthdate form-control"
                            type="date"
                            id="inputBirthdate"
                            value={datosUser.birthdate}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="container-gender container-global">
                        <div className="d-flex position-relative">
                          <img src={imgGender} alt="" />
                          <input
                            type="text"
                            id="inputGender"
                            className="inputCountry form-control"
                            value={datosUser.gender}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-check  container-check ">
                    <div className="d-flex">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value={true}
                        checked
                        id="checkbox"
                        readOnly
                      />
                      <label className="form-check-label">
                        <span>{t("acepto terminos y condiciones")} </span>
                        <a href={"/terminosYcondiciones"} className="terminos">
                          {t("terminos y condiciones")}
                        </a>
                      </label>
                    </div>
                  </div>

                  <div className="container-btn">
                    <button className="btn-form wallet-btn" type="submit">
                      {t("Sincronizar datos")}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              // from create User
              <form
                className="formulario d-flex flex-column align-items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="container-info-form mb-3 d-flex">
                  <div className="container-label-input d-flex">
                    <div className="container1-info">
                      <div className="container-user container-global">
                        <div className="d-flex position-relative">
                          <img src={imgUser} alt="" />

                          <input
                            type="text"
                            className="form-control"
                            id="inputUserName"
                            autoComplete="off"
                            placeholder={t("usuarioSideBar")}
                            {...register("inputUserName", { required: true })}
                          />
                        </div>
                        {errors.inputUserName?.type === "required" && (
                          <p
                            role="alert"
                            className="text-danger mb-2 alerta-class"
                          >
                            {t("El nombre de usuario es requerido")}
                          </p>
                        )}
                      </div>
                      <div className="container-email container-global">
                        <div className="d-flex position-relative">
                          <img src={imgEmail} alt="" />
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            autoComplete="off"
                            placeholder={t("email")}
                            {...register("inputEmail", {
                              required: true,
                              pattern:
                                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                            })}
                          />
                        </div>

                        {errors.inputEmail?.type === "required" && (
                          <p
                            role="alert"
                            className="text-danger mb-2 alerta-class"
                          >
                            {t("El correo electronico es requerido")}
                          </p>
                        )}
                        {errors.inputEmail?.type === "pattern" && (
                          <p
                            role="alert"
                            className="text-danger mb-2 alerta-class"
                          >
                            {t("debe agregar un correo valido")}
                          </p>
                        )}
                      </div>
                      <div className="container-country container-global">
                        <div className="d-flex position-relative">
                          <img src={imgCountry} alt="" />
                          <input
                            type="text"
                            id="inputCountry"
                            className="inputCountry form-control"
                            {...register("inputCountry", { required: true })}
                            autoComplete="off"
                            placeholder={t("pais")}
                          />
                        </div>
                        {errors.inputCountry?.type === "required" && (
                          <p
                            role="alert"
                            className="text-danger mb-2 alerta-class"
                          >
                            {t("El pais es requerido")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="container2-info">
                      <div className="container-FullName container-global">
                        <div className="d-flex position-relative">
                          <img src={imgFullName} alt="" />
                          <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            autoComplete="off"
                            placeholder={t("name")}
                            {...register("inputName", { required: true })}
                          />
                        </div>
                        {errors.inputName?.type === "required" && (
                          <p
                            role="alert"
                            className="text-danger mb-2 alerta-class"
                          >
                            {t("El nombre es requerido")}
                          </p>
                        )}
                      </div>
                      <div className="container-birthday container-global">
                        <div className="d-flex position-relative">
                          <img src={imgbirthday} alt="" />
                          <input
                            className="inputBirthdate form-control"
                            type="date"
                            id="inputBirthdate"
                            placeholder={t("fechadenacimiento")}
                            {...register("inputBirthdate", { required: true })}
                          />
                        </div>
                        {errors.inputBirthdate?.type === "required" && (
                          <p
                            role="alert"
                            className="text-danger mb-2 alerta-class"
                          >
                            {t("La fecha de cumpleaños es requerida")}
                          </p>
                        )}
                      </div>
                      <div className="container-gender container-global">
                        <div className="d-flex position-relative">
                          <img src={imgGender} alt="" />
                          <select
                            aria-label="Default select example"
                            className="selectGender form-control"
                            id="inputGender"
                            {...register("inputGender", { required: true })}
                          >
                            <option>{t("genero")}</option>
                            <option value={t("hombre")}>{t("hombre")}</option>
                            <option value={t("mujer")}>{t("mujer")}</option>
                            <option value={t("prefieronodecir")}>
                              {t("prefieronodecir")}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-check  container-check ">
                    <div className="d-flex">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="checkbox"
                        {...register("checkbox", { required: true })}
                      />
                      <label className="form-check-label">
                        {t("acepto terminos y condiciones")}
                      </label>
                    </div>
                    {errors.checkbox?.type === "required" && (
                      <p role="alert" className="text-danger my-2 alerta-class">
                        {t("Debe aceptar los terminos")}
                      </p>
                    )}
                  </div>

                  <div className="container-btn">
                    <button className="btn-form wallet-btn" type="submit">
                      {t("Registrar")}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="container-mini-footer">
            <p>{t("footerNuevo")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterN;
