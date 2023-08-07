import { useState } from "react";

const useHandlerIsOpenMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function useHandlerMenu() {
    let element = document.getElementById('sidebar').classList;
    let isHasClass = element.contains("d-none")

    if (isHasClass) {
      console.log('si lo tiene');
      setIsOpenMenu(true)
    } else {
      console.log('no lo tiene');
      setIsOpenMenu(false)
    }
    console.log({
      isOpenMenu,
      element,
      isHasClass
    })
  }

  return { isOpenMenu, useHandlerMenu }
}

export default useHandlerIsOpenMenu