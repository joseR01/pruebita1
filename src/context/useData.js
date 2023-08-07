import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { useAccount } from "wagmi";
import {URLApi} from "../utilities/networks"
import {setLocalStorage} from "../utilities/handleLocalStorage"
import axios from "axios";
import { getEncryptedDataRegistrationKYC } from "../contract/methos";
import { getDatosDecryptServer } from "../utilities/requestHttp";
const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const { isConnected,address } = useAccount();

  const userInicial = useMemo(() => ({
    id: null,
    address: null,
    referrals: [],
    referrer: null,
    image: null,
    name: null,
    userName: null,
    email: null,
    birthdate: null,
    country: null,
    gender: null,
  }),[])

  const authTypes = useMemo(()=>({
    isMember : "IS_MEMBER",
    isServer: "IS_SERVER",
    isMetamask: "IS_METAMASK",
    isLogout: "IS_LOGOUT"
  }),[])

  const [auth, dispatchAuth] = useReducer((state,action) => {
    if (action.type === authTypes.isMember) {
      return {
        ...state,
        isAuthMetamask: true,
        isAuthServer: true,
        isMember: true,
      }
    } else if(action.type === authTypes.isServer) {
      return {
        ...state,
        isAuthMetamask: true,
        isAuthServer: true,
        isMember: false,
      }
    } else if(action.type === authTypes.isMetamask) {
      return {
        ...state,
        isAuthMetamask: true,
        isAuthServer: false,
        isMember: false,
      }
    } else if(action.type === authTypes.isLogout) {
      return {
        ...state,
        isAuthMetamask: false,
        isAuthServer: false,
        isMember: false,
      }
    }
    return state
  },{
    isAuthMetamask: null,
    isAuthServer: null,
    isMember: null,
  })

  console.log({userInicial})
  
  const [userC, setUserC] = useState(userInicial);

  useEffect(() => {
    console.log({isConnected,auth})
    if (isConnected) {
      // loginServer(address)
      handlerConnection(address)
    } else {
      // console.log('DESCONECTADOTE AMIGO')
      dispatchAuth({
        type: authTypes.isLogout,
      })
    }
  }, [isConnected,authTypes,address]);

  async function loginServer(address) {
    try {
      const {data} =  await axios.post(`${URLApi}/api/v1/user/signin`,{wallet: address})
      axios.defaults.headers.common['Authorization'] = data.token

      const user = data.user
      if(user.isMember) {
        dispatchAuth({type: authTypes.isMember})
      } else if(user) {
        dispatchAuth({type: authTypes.isServer}) 
      } else {
        dispatchAuth({type: authTypes.isMetamask})
      }
      
      const newAuthUser = {
        id: user.id,
        image: user.image,
        referrer: user.referred,
        address:user.address,
        referrals: [],
      }
      setLocalStorage("tokenServer", data.token)

      setUserC((prevUser)=>({
        ...prevUser,
        ...newAuthUser
      }))
      // if is_member dispath Is_member 
      //else dispath is_server 
    } catch (error) {
      console.log({error},'login server')
      dispatchAuth({type: authTypes.isMetamask})
    }
  }

  async function getUserContractKYC (address) {
    try {
      const encryptedUser = await getEncryptedDataRegistrationKYC(`${address}`);

      if(typeof encryptedUser !== 'string' || encryptedUser?.code === 1100) {
        console.log({encryptedUser},'el usuario no esta registrado en KYC')
        dispatchAuth({type: authTypes.isMetamask})
        // return false
      }else {
        //busca el usuario en el contrato de KYC
        let userDeScrypt = await getDatosDecryptServer(atob(encryptedUser));
        setUserC({
          ...userC,
          name: userDeScrypt[0],
          userName: userDeScrypt[1],
          email: userDeScrypt[2],
          birthdate: userDeScrypt[3].replace(/,/g, "-"),
          country: userDeScrypt[4],
          gender: userDeScrypt[5],
        })
        console.log({userDeScrypt},'el usuario si esta registrado en KYC')
        return true
      }

    } catch (error) {
      console.log({error},'useContext')
      dispatchAuth({type: authTypes.isMetamask})
      // return false
    }
  }

  async function handlerConnection(address) {
    const result = await getUserContractKYC(address)
    console.log({result})
    await loginServer(address)
  }

  function changeImageContext(image) {
    setUserC({
      ...userC,
      image: image
    })
  }

  const data = {
    loginServer,
    userC,
    auth,
    changeImageContext,
    handlerConnection
  }
  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContextProvider }
export default DataContext