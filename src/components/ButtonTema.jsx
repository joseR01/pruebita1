import React, { useState } from "react";
import { ReactComponent as Iconmoondark } from "../assets/sidebar/bolitaDark.svg";
import { ReactComponent as Iconmoonlight } from "../assets/sidebar/bolitaMoon.svg";
const ButtonTema = () => {
  const [isActiveTema, setIsActiveTema] = useState(false);

  return (
    <div className="component-tema">
      <div
        className={`container-tema ${
          isActiveTema ? "justify-content-end" : ""
        }`}
        onClick={() => setIsActiveTema(!isActiveTema)}
      >
        <div className="icon-tema">{/* <Iconmoonlight/> */}</div>
      </div>
    </div>
  );
};

export default ButtonTema;
