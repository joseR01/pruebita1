import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import flechita from "../assets/icons/flechaCelesteR.svg";

const ButtonDashboard = () => {
  const { t } = useTranslation("");
  return (
    <div className="component-buttonDashboard">
      <Link to={"/dashboard"}>
        <p className="button-comp-dash">
          <img src={flechita} alt="" />
          {t("dashboardSideBar")}
        </p>
      </Link>
    </div>
  );
};

export default ButtonDashboard;
