import React from 'react'
import Modal from "react-modal";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import DataContext, {} from "../context/useData"
import { useContext } from 'react';
import { checkIsUserMember, registerUserMember } from '../contract/methos';
import { URLApi } from '../utilities/networks';
import axios from 'axios';
import { useAccount } from 'wagmi';

const ModalPay = () => {
  const { userC, auth,handlerConnection } = useContext(DataContext);
  const { address } = useAccount();
  const { t } = useTranslation("");
  
  Modal.setAppElement("#root");

  const [modalIsOpen, setModalIsOpen] = useState({paid: true, loading: false});
  const [mensaje, setMensaje] = useState('');
  const [isUserRegisterMember, setIsUserRegisterMember] = useState(false);

  const handledModal = (caso) => {
    if (caso === "loading") setModalIsOpen({ loading: false, paid: false })
    if (caso === "payModal") setModalIsOpen({ loading: true, paid: false })
  };

  // async function payTheMember() {
  //   try {
  //     console.log({
  //       user:userC.address,
  //       referrer: userC.referrer.address
  //     })

  //     function handleMessage(menssage='') {
  //       setMensaje(menssage)
  //       setTimeout(()=>handledModal("loading"),3000)
  //       setTimeout(()=>setModalIsOpen({paid: true,loading: false,}),4000)
  //     }

  //     if(isUserRegisterMember) {
  //       const response = await axios.put(URLApi+'/api/v1/user/me',{address:userC.address})
  //       if (response.status === 200) {
  //         handlerConnection(userC.address)
  //       }
  //     }else {
  //       setMensaje('procesando el pago del token')
  //       const transferToken = await tokenTransfer(userC.address)
  //       console.log({transferToken})

  //       if(transferToken.code === 100) {
  //         handleMessage('no se pudo transferir el dinero para la compra del token')
  //       }else {
  //         setMensaje('subcribiendo al usuario a la membresia')
  //         const isMember = await registerUserMember(userC.address, userC.referrer.address)
  //         console.log({isMember})
          
  //         if(isMember.code === 100) {
  //           handleMessage('no se pudo subcribir al usuario a la membresia')
  //         }else {
  //           setMensaje('registrando al usuario')
  //           if(transferToken.code !== 100 && isMember.code !== 100) {
  //             const response = await axios.put(URLApi+'/api/v1/user/me',{address:userC.address})
  //             if (response.status === 200) {
  //               handlerConnection(userC.address)
  //               handleMessage('')           
  //             }
  //           }else {
  //             handleMessage('no se pudo registrando al usuario')
  //           }
  //         }
  
  //       }
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async function payTheMember() {
    try {
      console.log({
        user:userC.address,
        referrer: userC.referrer.address
      })

      function handleMessage(menssage='') {
        setMensaje(menssage)
        setTimeout(()=>handledModal("loading"),3000)
        setTimeout(()=>setModalIsOpen({paid: true,loading: false,}),4000)
      }
      
      //si ya es miembro en el contrato, pero no en el backEnd
      if(isUserRegisterMember) {
        const response = await axios.put(URLApi+'/api/v1/user/me',{address:userC.address})
        if (response.status === 200) {
          handlerConnection(userC.address)
          handleMessage('usuario registrado')           
        }
        return
      }

      //procesando el pago del token
      // setMensaje('procesando el pago del token')
      // const transferToken = await tokenTransfer(userC.address)
      // console.log({transferToken})

      // if(transferToken.code === 100) {
      //   handleMessage('no se pudo transferir el dinero para la compra del token')
      //   return
      // }

      //suscribiendo a la membresia
      setMensaje('suscribiendo al usuario a la membresia')
      const isMember = await registerUserMember(userC.address, userC.referrer.address)
      console.log({isMember})
      
      if(isMember.code === 100) {
        handleMessage('no se pudo subcribir al usuario a la membresia')
        return
      }

      //registrando al usuario en el backend
      setMensaje('registrando al usuario')
      if(isMember.code !== 100) {
        const response = await axios.put(URLApi+'/api/v1/user/me',{address:userC.address})
        if (response.status === 200) {
          handlerConnection(userC.address)
          handleMessage('usuario registrado')           
        }
        return
      }

      handleMessage('no se pudo registrando al usuario')

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const checkUserRegistrationMember = async (address) => {
      const isMember = await checkIsUserMember(address)
      console.log({isMember},'modal')
      if(isMember === true) {
        setIsUserRegisterMember(true); 
      }else {
        setIsUserRegisterMember(false); 
      }
    };

    if(address) checkUserRegistrationMember(address);

  }, [address]);
  return (<>
      {
        !auth.isMember && auth.isAuthServer ? (
          <>
            <Modal
              isOpen={modalIsOpen.paid}
              contentLabel="Example Modal"
              className="container-modal-dashboard-pay"
            >
              <p className="text-center">{t("Para acceder pagar Fee")}</p>
              <button
                className="wallet-btn mt-3"
                onClick={() => {handledModal("payModal");payTheMember()}}
              >
                {t("Pagar fee")}
              </button>
            </Modal>
            <Modal
              isOpen={modalIsOpen.loading}
              contentLabel="Example Modal"
              className="container-modal-dashboard-pay"
            >
              <h4 className="text-center fw-bold text-black">
                {t("Processing")}
              </h4>
              <p className='my-2 text-center'>
                {mensaje}
              </p>
              <div className="spinner-border text-primary mt-3" role="status">
                <span className="visually-hidden">{t('cargando')}</span>
              </div>
            </Modal>
          </>
        ) : 
        (<></>)
      }
  </>)
}

export default ModalPay