import React from "react";
import FooterN from "./FooterN";
import RootRouter from "../routers/RootRouter";
import NavbarN from "./NavbarN";
import Sidebar from "./Sidebar";
import useHandlerIsOpenMenu from "../utilities/useHandlerIsOpenMenu";
import NavbarList from "./NavbarList";
import ModalPay from "./ModalPay";

const Layout = () => {
  const { isOpenMenu, useHandlerMenu } = useHandlerIsOpenMenu();

  return (
    <div className="layout ">
      <Sidebar useHandlerMenu={useHandlerMenu} isOpenMenu={isOpenMenu} />
      <div className="container-content">
        <div>
          <div className="navbarLayout">
            <NavbarN useHandlerMenu={useHandlerMenu} />
            <NavbarList />
          </div>
          <div className="bodyLayout">
            <RootRouter />
            <ModalPay/>
          </div>
        </div>
        <div className="footerLayout">
          <FooterN />
        </div>
      </div>
    </div>
  );
};

export default Layout;
