import { useTranslation } from "react-i18next";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import convertBase64 from "../utilities/convertBase64";
import ButtonDashboard from "../components/ButtonDashboard";

// importaciones de imagenes
import imgWallet from "../assets/icons/sponsorWallet.svg";
import iconEditar from "../assets/icons/editProfile.svg";
import iconUser from "../assets/profile/userIcon.svg";
import iconFullName from "../assets/profile/fullName.svg";
import iconBirthday from "../assets/profile/birthday.svg";
import iconCountry from "../assets/profile/country.svg";
import iconGender from "../assets/profile/gender.svg";
import iconEmail from "../assets/profile/email.svg";
import iconFace from "../assets/profile/facebook.svg";
import iconTwitter from "../assets/profile/twitter.svg";
import iconInsta from "../assets/profile/instagram.svg";
import iconYoutube from "../assets/profile/youtube.svg";
import iconSponsorB from "../assets/icons/sponsorUser.svg";
import fotoPerfil from "../assets/navbar/icons8-user-White.png";
import iconLink from "../assets/profile/card_travel.svg";
import { ReactComponent as IconClose } from "../assets/contracts/close.svg";

// importaciones para los modales
import Modal from "react-modal";
import axios from "axios";
import { URLApi, globalCompanyName } from "../utilities/networks";

import DataContext from "../context/useData";
import { useContext } from "react";
import {
  getEncryptedDataRegistrationKYC,
  updateUserKYC,
} from "../contract/methos";
import { getDatosDecryptServer } from "../utilities/requestHttp";

Modal.setAppElement("#root");

const ProfileN = () => {
  const { t } = useTranslation("");

  /** contantes de los estados de wagmi */
  const { address } = useAccount();
  const { userC, auth, changeImageContext } = useContext(DataContext);

  const dataAboutMeInitial = {
    email: "@red1",
    facebook: "@red2",
    twitter: "@red3",
    instagram: "@red4",
    youtube: "@red5",
  };

  const datosWallet = {
    wallet: address,
    linkRefferral: `iamoney.finance/?ref=${address}`,
  };

  const dataUserInitial = {
    fullname: "Initial",
    userName: "Initial",
    dateOfBirth: "Initial",
    gender: "Initial",
    country: "Initial",
  };

  const personalDetails = [
    {
      img: iconUser,
      name: t("usuarioSideBar"),
    },
    {
      img: iconFullName,
      name: t("name"),
    },
    {
      img: iconBirthday,
      name: t("fechadenacimiento"),
    },
    {
      img: iconCountry,
      name: t("pais"),
    },
    {
      img: iconGender,
      name: t("genero"),
    },
  ];

  const listAboutMe = [
    {
      img: iconEmail,
      name: "Email",
    },
    {
      img: iconFace,
      name: "Facebook",
    },
    {
      img: iconTwitter,
      name: "Twitter",
    },
    {
      img: iconInsta,
      name: "Instagram",
    },
    {
      img: iconYoutube,
      name: "Youtube",
    },
  ];
  //stados para las imagenes
  const [imagenServer, SetImagenServer] = useState(null);
  const [imagenLocal, setImagenLocal] = useState(null);

  //estados
  const [aboutMe, setAboutMe] = useState(dataAboutMeInitial);
  const [userProfile, setUserProfile] = useState(dataUserInitial);
  const [datosReferral, setDatosReferral] = useState({ name: "", address: "" });
  //perfil
  const [userS, setUserS] = useState("");
  const [fullnameS, setFullnameS] = useState("");
  const [dateOfBirthS, setDateOfBirthS] = useState("");
  const [genderS, setGenderS] = useState("");
  const [countryS, setCountryS] = useState("");
  //about-me
  const [emailS, setEmailS] = useState("");
  const [facebookS, setFacebookS] = useState("");
  const [twitterS, setTwitterS] = useState("");
  const [instagramS, setInstagramS] = useState("");
  const [youtubeS, setYoutubeS] = useState("");

  // Estados y funciones para el modal del datos del usuario
  const [modalIsOpenPersonalDetails, setModalIsOpenPersonalDetails] =
    useState(false);

  const handleFolderSelect = async (event) => {
    if (!event.target.files) return;

    const imageInsert = event.target.files[0];
    console.log(imageInsert);

    if (imageInsert) {
      const base64 = await convertBase64(imageInsert);
      setImagenLocal(base64);
      await submitImageServer(imageInsert);
    } else {
      setImagenLocal(null);
    }
  };

  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handlerModalPersonalDetails = () => {
    setUserS(userProfile.userName);
    setFullnameS(userProfile.fullname);
    setDateOfBirthS(userProfile.dateOfBirth);
    setGenderS(userProfile.gender);
    setCountryS(userProfile.country);

    setEmailS(aboutMe.email);
    setFacebookS(aboutMe.facebook);
    setTwitterS(aboutMe.twitter);
    setInstagramS(aboutMe.instagram);
    setYoutubeS(aboutMe.youtube);

    setModalIsOpenPersonalDetails(!modalIsOpenPersonalDetails);
  };

  const submitDataUser = async (event) => {
    event.preventDefault();

    const newDataPerfil = {
      userName: userS || userProfile.userName,
      fullname: fullnameS || userProfile.fullname,
      dateOfBirth: dateOfBirthS || userProfile.dateOfBirth,
      gender: genderS || userProfile.gender,
      country:
        countryS.charAt(0).toUpperCase() + countryS.slice(1) ||
        userProfile.country,
    };

    const newAboutMe = {
      email: emailS || aboutMe.email,
      facebook: facebookS || aboutMe.facebook,
      twitter: twitterS || aboutMe.twitter,
      instagram: instagramS || aboutMe.instagram,
      youtube: youtubeS || aboutMe.youtube,
    };

    // console.log({newAboutMe})
    // console.log({newDataPerfil})
    setAboutMe(newAboutMe);
    setUserProfile(newDataPerfil);

    const { email, ...netWorkWithoutEmail } = newAboutMe;
    const userWithEmail = { ...newDataPerfil, email: newAboutMe.email };

    await fetchCreateAboutMe(netWorkWithoutEmail);

    if (
      userS !== userProfile.userName ||
      fullnameS !== userProfile.fullname ||
      dateOfBirthS !== userProfile.dateOfBirth ||
      genderS !== userProfile.gender ||
      countryS.charAt(0).toUpperCase() + countryS.slice(1) !==
        userProfile.country ||
      emailS !== aboutMe.email
    ) {
      await contractEditUser(address, userWithEmail);
    }

    setUserS("");
    setFullnameS("");
    setDateOfBirthS("");
    setGenderS("");
    setCountryS("");

    setEmailS("");
    setFacebookS("");
    setTwitterS("");
    setInstagramS("");
    setYoutubeS("");

    handlerModalPersonalDetails();
  };

  async function contractEditUser(address, userWithEmail) {
    const { fullname, userName, email, dateOfBirth, country, gender } =
      userWithEmail;

    const dataUser = [fullname, userName, email, dateOfBirth, country, gender, globalCompanyName];

    try {
      const response = await axios.post(URLApi + "/api/v1/data/encrypt", {
        data: dataUser,
      });
      if (response.status === 200) {
        const userEncrypt = response.data.data;
        // console.log({userEncrypt}, )
        const updateUser = await updateUserKYC(address, userEncrypt);
        console.log({ updateUser });
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function fetchCreateAboutMe(newSocialNetwork) {
    try {
      const response = await axios.post(
        URLApi + "/api/v1/social-network",
        newSocialNetwork
      );
      console.log(response);
    } catch (error) {
      console.log({ error });
    }
  }

  async function submitImageServer(imageInsert) {
    try {
      if (imageInsert) {
        const formData = new FormData();
        formData.append("imgUser", imageInsert);
        const response = await axios.post(
          URLApi + "/api/v1/user/me/image",
          formData
        );
        console.log(response);
        changeImageContext(response.data.user.image);

        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchGetSocialWorking() {
    try {
      const response = await axios.get(URLApi + "/api/v1/user/me/");
      const socialWorking = response.data.user.socialMedia;

      console.log({ socialWorking });
      if (socialWorking) {
        setAboutMe({
          email: userC.email,
          facebook: socialWorking.facebook,
          twitter: socialWorking.twitter,
          instagram: socialWorking.instagram,
          youtube: socialWorking.youtube,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handlerDataReferral(address) {
    const encryptedUser = await getEncryptedDataRegistrationKYC(`${address}`);
    let userDeScrypt = await getDatosDecryptServer(atob(encryptedUser));
    console.log({ userDeScrypt });
    setDatosReferral({
      name: userDeScrypt[0],
      address: address,
    });
  }

  useEffect(() => {
    if (auth.isAuthServer) {
      if (userC) {
        //datos desde el servidor
        setAboutMe({
          ...aboutMe,
          email: userC.email,
        });
        // datos desde el contrato
        setUserProfile({
          ...userProfile,
          fullname: userC.name,
          userName: userC.userName,
          dateOfBirth: userC.birthdate,
          gender: userC.gender,
          country: userC.country,
        });
        if (userC.image) {
          SetImagenServer(URLApi + "/" + userC.image);
        }
        //setiando al referido
        handlerDataReferral(userC.referrer.address);
      }
      fetchGetSocialWorking();
    }
  }, [userC]);

  return (
    <div className="page-profile">
      <ButtonDashboard />
      <div className="container-up-down ">
        <div className="container-up row">
          <div className="col-12 col-sm-6 col-lg-3 p-0">
            <div className="container-foto-name">
              <div className="foto">
                <img
                  src={imagenLocal || imagenServer || fotoPerfil}
                  alt=""
                  onClick={handleImageClick}
                />
                <input
                  id="folder-select"
                  type="file"
                  // webkitdirectory="true"
                  onChange={handleFolderSelect}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/webp"
                />
              </div>
              <div className="container-name-info">
                <h1>{`${userProfile.fullname}`}</h1>
                <p>{`${aboutMe.email}`}</p>
                <p className="data">{`${userProfile.dateOfBirth}`}</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-lg-5 order-1  order-lg-0 p-0">
            <div className="container-referralLink">
              <h1>{t("Referral link")}</h1>
              <div className="container-img-link">
                <img src={iconLink} alt="" />
                <p>{datosWallet.linkRefferral}</p>
              </div>
              <button
                data-tooltip-id="my-tooltip-profile"
                data-tooltip-content={t("link de referidos copiado")}
                // data-tooltip-variant="info"
                onClick={() => {
                  navigator.clipboard.writeText(`${datosWallet.linkRefferral}`);
                }}
                className="wallet-btn btn-referral-profile"
                style={{ width: "12vw" }}
              >
                {t("btnCopiarLinkRefNavbar")}
              </button>
              <ReactTooltip
                id="my-tooltip-profile"
                events={["click"]}
                delayHide={1000}
                place="top"
                style={{ backgroundColor: " #006998", color: "#ffffff" }}
              ></ReactTooltip>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4 p-0">
            <div className=" container-sponsor">
              <h1 className="sponsor">{t("My sponsor")}</h1>
              <div className="container-name-sponsor mb-2">
                <img src={iconSponsorB} alt="" />
                <p className="name-sponsor2">{datosReferral.name}</p>
              </div>
              <div className="container-wallet-sponsor">
                <img src={imgWallet} alt="" />
                <p className="wallet-sponsor2">{datosReferral.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-down row">
          <div className="col-12 col-lg-6 p-0">
            <div className="container-personal-details">
              <div className="container-tittle-img">
                <h1>{t("Personal details")}</h1>
                <img
                  src={iconEditar}
                  id="modal-personalDetails"
                  alt=""
                  onClick={handlerModalPersonalDetails}
                />
                <Modal
                  isOpen={modalIsOpenPersonalDetails}
                  onRequestClose={handlerModalPersonalDetails}
                  contentLabel="Example Modal"
                  className="container-modalPersonalDetails"
                >
                  <div className="container-icon-closer">
                    <IconClose
                      width={"100%"}
                      fill="#D9D9D9"
                      onClick={handlerModalPersonalDetails}
                    />
                  </div>
                  <h2 className="tituloModalData">{t("Personal details")}</h2>
                  <form className="formularioData">
                    <label
                      htmlFor="inputUser"
                      className="labelUser labelGlobal"
                    >
                      {t("usuarioSideBar")}
                    </label>
                    <input
                      className="inputUser inputGlobal"
                      value={userS}
                      type="text"
                      id="inputUser"
                      onChange={(event) => setUserS(event.target.value)}
                    />
                    <label
                      htmlFor="inputFullname"
                      className="labelFullname labelGlobal"
                    >
                      {t("name")}
                    </label>
                    <input
                      className="inputFullname inputGlobal"
                      value={fullnameS}
                      type="text"
                      id="inputFullname"
                      onChange={(event) => setFullnameS(event.target.value)}
                    />
                    <label
                      htmlFor="inputBirthdate"
                      className="labelBirthdate labelGlobal"
                    >
                      {t("fechadenacimiento")}
                    </label>
                    <input
                      className="inputBirthdate inputGlobal"
                      value={dateOfBirthS}
                      type="date"
                      id="inputBirthdate"
                      onChange={(event) => setDateOfBirthS(event.target.value)}
                    />

                    <label
                      htmlFor="inputGender"
                      className="labelGender labelGlobal"
                    >
                      {t("genero")}
                    </label>
                    <select
                      aria-label="Default select example"
                      className="selectGender inputGlobal"
                      id="inputGender"
                      value={genderS}
                      onChange={(event) => setGenderS(event.target.value)}
                    >
                      <option>{t("elegir")}</option>
                      <option className="" value={t("hombre")}>
                        {t("hombre")}
                      </option>
                      <option className="" value={t("mujer")}>
                        {t("mujer")}
                      </option>
                      <option className="" value={t("prefieronodecir")}>
                        {t("prefieronodecir")}
                      </option>
                    </select>

                    <label
                      htmlFor="inputCountry"
                      className="labelCountry labelGlobal"
                    >
                      {t("pais")}
                    </label>
                    <input
                      type="text"
                      id="inputCountry"
                      value={countryS}
                      className="inputCountry inputGlobal"
                      onChange={(event) => setCountryS(event.target.value)}
                    />

                    <h2 className="tituloModalData mt-3">{t("About me")}</h2>

                    <label
                      htmlFor="inputEmail"
                      className="labelEmail labelGlobal"
                    >
                      Email
                    </label>
                    <input
                      className="inputEmail inputGlobal"
                      value={emailS}
                      type="email"
                      id="inputEmail"
                      onChange={(event) => setEmailS(event.target.value)}
                    />
                    <label
                      htmlFor="inputFacebook"
                      className="labelFacebook labelGlobal"
                    >
                      Facebook
                    </label>
                    <input
                      className="inputFacebook inputGlobal"
                      value={facebookS}
                      type="text"
                      id="inputFacebook"
                      onChange={(event) => setFacebookS(event.target.value)}
                    />
                    <label
                      htmlFor="inputTwitter"
                      className="labelTwitter labelGlobal"
                    >
                      Twitter
                    </label>
                    <input
                      className="inputTwitter inputGlobal"
                      value={twitterS}
                      type="text"
                      id="inputTwitter"
                      onChange={(event) => setTwitterS(event.target.value)}
                    />

                    <label
                      htmlFor="inputInstagram"
                      className="labelInstagram labelGlobal"
                    >
                      Instagram
                    </label>
                    <input
                      type="text"
                      id="inputInstagram"
                      className="inputInstagram inputGlobal"
                      value={instagramS}
                      onChange={(event) => setInstagramS(event.target.value)}
                    />

                    <label
                      htmlFor="inputYoutube"
                      className="labelYoutube labelGlobal"
                    >
                      Youtube
                    </label>
                    <input
                      type="text"
                      id="inputYoutube"
                      value={youtubeS}
                      className="inputYoutube inputGlobal"
                      onChange={(event) => setYoutubeS(event.target.value)}
                    />

                    <div className="container-btns">
                      <button
                        className="btn-cerrar btnGlobalForm"
                        onClick={handlerModalPersonalDetails}
                      >
                        {t("cerrar")}
                      </button>
                      <button
                        className="btn-guardar btnGlobalForm"
                        onClick={(event) => {
                          submitDataUser(event);
                        }}
                      >
                        {t("guardarcambios")}
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
              <div className="container-info-user d-flex">
                <div className="container-izq">
                  {personalDetails.map((tittle, index) => {
                    return (
                      <div key={index} className="container-img-tittle d-flex">
                        <img src={tittle.img} alt="imagen" />
                        <p>{tittle.name}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="container-der">
                  <p>{`${userProfile.userName}`}</p>
                  <p>{`${userProfile.fullname}`}</p>
                  <p>{`${userProfile.dateOfBirth}`}</p>
                  <p>{`${userProfile.country}`}</p>
                  <p>{`${userProfile.gender}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 p-0">
            <div className="container-aboutme">
              <div className="container-tittle-img">
                <h1>{t("About me")}</h1>
                <img
                  src={iconEditar}
                  alt=""
                  onClick={handlerModalPersonalDetails}
                />
              </div>
              <div className="container-redes-user d-flex">
                <div className="container-izq">
                  {listAboutMe.map((tittle, index) => {
                    return (
                      <div key={index} className=" container-img-tittle d-flex">
                        <img src={tittle.img} alt="imagen" />
                        <p>{tittle.name}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="container-der">
                  <p>{`${aboutMe.email}`}</p>
                  <p>{`${aboutMe.facebook}`}</p>
                  <p>{`${aboutMe.twitter}`}</p>
                  <p>{`${aboutMe.instagram}`}</p>
                  <p>{`${aboutMe.youtube}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileN;
