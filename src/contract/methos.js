
import Web3 from 'web3';
import { 
  KYC_CONTRACT_ADDRESS, KYC_CONTRACT_ABI,
  MEMBERS_CONTRACT_ADDRESS, MEMBERS_CONTRACT_ABI,
  BEP20_CONTRACT_ADDRESS, BEP20_CONTRACT_ABI,
  PLANES_ADDRESS,PLANES_ABI
} from './contracts';
import moment from 'moment';


async function getContract(abis,address) {
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(abis, address).methods;
}

//function contract KYC----------------------------------------------------------------------
export const checkIsUserRegistrationKYC = async (address) => {
  try {
    const methods = await getContract(KYC_CONTRACT_ABI,KYC_CONTRACT_ADDRESS)
    const result = await methods.isUserRegistered(address).call();
    // console.log('Usuario registrado:', result);
    return result 
  } catch (error) {
    console.error({error});
    return error
  } 
};

export const registerUserKYC = async (address, dataEncrypt) => {
  try {
    const methods = await getContract(KYC_CONTRACT_ABI,KYC_CONTRACT_ADDRESS)
    const transaction = await methods.registerUser(dataEncrypt);
    const options = {
      from: address,
      gasPrice: "10000000000", // 3 Gwei en unidades de gas (gwei * 1,000,000,000)
    };
    // Envía la transacción
    const receipt = await transaction.send(options);
    console.log("Transacción exitosa:", receipt);

    return receipt
    
  } catch (error) {
    console.log({error})
    return error
  }

}

export const getEncryptedDataRegistrationKYC = async (address) => {
  try {
    const methods = await getContract(KYC_CONTRACT_ABI,KYC_CONTRACT_ADDRESS)
    const result = await methods.getEncryptedData(`${address}`).call();
    // console.log('Usuario registrado:', result);
    return result 
  } catch (error) {
    console.error({error});
    return error
  } 
};

export const updateUserKYC = async (address, dataEncrypt) => {
  try {
    const methods = await getContract(KYC_CONTRACT_ABI,KYC_CONTRACT_ADDRESS)

    const transaction = await methods.updateUserData(dataEncrypt);
    const options = {
      from: address,
      gasPrice: "10000000000", // 3 Gwei en unidades de gas (gwei * 1,000,000,000)
    };
    // Envía la transacción
    const receipt = await transaction.send(options);
    console.log("Transacción exitosa:", receipt);

    return receipt
  } catch (error) {
    console.log({error})
    return error
  }
}

//function contract Member-------------------------------------------------------------------
export const registerUserMember = async (address,referral) => {
  try {
    const methodsToken = await getContract(BEP20_CONTRACT_ABI, BEP20_CONTRACT_ADDRESS)
    const web3 = new Web3(window.ethereum);
    const amountToApprove = 12; // Cantidad de tokens a aprobar

    const options = {
      from: address,
      gasPrice: "10000000000", // 3 Gwei en unidades de gas (gwei * 1,000,000,000)
    };
    
    await methodsToken.approve(MEMBERS_CONTRACT_ADDRESS, web3.utils.toWei(amountToApprove.toString(), 'ether')).send(options);

    const methodsMember = await getContract(MEMBERS_CONTRACT_ABI, MEMBERS_CONTRACT_ADDRESS)
    const transaction = await methodsMember.registerReferral(referral);

    // Envía la transacción
    const receipt = await transaction.send(options);
    console.log("Transacción exitosa:", receipt);
  
    return receipt
    
  } catch (error) {
    console.log({error})
    return error
  }

}

export const checkIsUserMember = async (address) => {
  try {
    const methods = await getContract(MEMBERS_CONTRACT_ABI,MEMBERS_CONTRACT_ADDRESS)
    const result = await methods.registeredAddresses(address).call();
    return result    
  } catch (error) {
    console.error({error});
    return error    
  } 
};

//function contract Token---------------------------------------------------------------------
// export const tokenTransfer = async (address) => {
//   try {
//     const methods = await getContract(BEP20_CONTRACT_ABI, BEP20_CONTRACT_ADDRESS)
//     const web3 = new Web3(window.ethereum);
//     const amountToApprove = 10; // Cantidad de tokens a aprobar
//     const options = {
//       from: address,
//       gasPrice: "10000000000", // 3 Gwei en unidades de gas (gwei * 1,000,000,000)
//     };
//     const transaction = await methods.approve(MEMBERS_CONTRACT_ADDRESS, web3.utils.toWei(amountToApprove.toString(), 'ether')).send(options);

//     // Envía la transacción
//     const receipt = transaction;
//     console.log("Transacción exitosa:", receipt);
  
//     return receipt
    
//   } catch (error) {
//     console.log({error})
//     return error
//   }

// }

// function contract plans-------------------------------------------------------------------
export const getExistingPlanesContract = async () => {
  try {
    const method = await getContract(PLANES_ABI, PLANES_ADDRESS)
    const existingPlans = await method.getAvailablePlans().call()
    console.log({method,existingPlans},'planes')
    return existingPlans
  } catch (error) {
    console.log({error})
  }
}

export const getDetailsOfThePlanContract = async (PlantId) => {
  try {
    const methods = await getContract(PLANES_ABI, PLANES_ADDRESS)
    const detailsPlan = await methods.plans(PlantId).call()
    console.log({detailsPlan},'planes')
    return detailsPlan
  } catch (error) {
    console.log({error})
  }
}

export const payPlanInContract = async (addressUser, addressReferral, amount, plantId) => {
  try {
    const methodsPlan = await getContract(PLANES_ABI, PLANES_ADDRESS)
    const web3 = new Web3(window.ethereum);
    const tokenContract = new web3.eth.Contract(BEP20_CONTRACT_ABI, BEP20_CONTRACT_ADDRESS);
    // const newAmount = amount/ 10**18
    
    const options = {
      from: addressUser,
      gasPrice: "10000000000", // 3 Gwei en unidades de gas (gwei * 1,000,000,000)
    }
    console.log({addressUser, addressReferral, amount, plantId},'aprovacion')
    await tokenContract.methods.approve(PLANES_ADDRESS, web3.utils.toWei(amount.toString(), 'ether')).send(options);

    const transaction = await methodsPlan.makeDeposit (addressReferral, web3.utils.toWei(amount.toString(), 'ether'), plantId).send(options);
    console.log({addressUser, addressReferral, amount, plantId,transaction})

    // Envía la transacción
    const receipt = transaction;
    console.log("Transacción exitosa:", receipt);
  
    return receipt
  } catch (error) {
    console.log({error})
  }
}

export const getUserPlanId = async (address) => {
  try {
    const method = await getContract(PLANES_ABI, PLANES_ADDRESS)
    const existingPlans = await method.getUserDepositIds(address).call()
    console.log({existingPlans,method},'planes')
    return existingPlans
  } catch (error) {
    console.log({error})
  }
}

export const getListDepositUserPlans = async (list) => {
  try {
    const method = await getContract(PLANES_ABI, PLANES_ADDRESS)
    const listPlan = await Promise.all(list.map( async (planId, index) => {
      const planUser = await method.getDeposit(planId).call()
      const formate = () => {

        // Creamos un objeto Moment utilizando Moment.js
        const fechaMoment = moment( Number(planUser.creationTime) * 1000);
        const fechaFormateadaInit = fechaMoment.format("D/M/YYYY");

        const fechaSumada = fechaMoment.add(360, 'days');
        // Formateamos la fecha en el formato deseado
        const fechaFormateadaFinal = fechaSumada.format("D/M/YYYY");
  
        const partesFechaInit = fechaFormateadaInit.split("/");
        const partesFechaEnd = fechaFormateadaFinal.split("/");
        // Formatear la fecha en el nuevo formato "yyyy-m-d"
        const fechaFormateInit = `${partesFechaInit[2]}-${partesFechaInit[1]}-${partesFechaInit[0]}`;
        const fechaFormateEnd = `${partesFechaEnd[2]}-${partesFechaEnd[1]}-${partesFechaEnd[0]}`;

        return [fechaFormateadaInit,fechaFormateadaFinal,fechaFormateInit,fechaFormateEnd];
      }
      planUser.fecha = formate()
      planUser.time = Number(planUser.period)/86400/30
      planUser.planId = Number(planId)
      planUser.AmountConverted = Number(planUser.amount)/ 10**18
      planUser.ProfitConverted = Number(planUser.profit)/ 10**18
      return planUser
    }))

    return listPlan
  } catch (error) {
    console.log({error})
  }
}

export async function getProfitsUserPlans(address) {
  try {
    const method = await getContract(PLANES_ABI, PLANES_ADDRESS)
    const getUserWithdrawableProfit = await method.getUserWithdrawableProfit(address).call()
    const getAvailableProfitAllSources = await method.getAvailableProfitAllSources(address).call()
    console.log({getUserWithdrawableProfit,getAvailableProfitAllSources, method},'profit de plans')
    return Number(getUserWithdrawableProfit) / 10**18
  } catch (error) {
    console.log({error})
    return error
  }
  
}

export async function getProfitsUserAllSources(address) {
  try {
    const method = await getContract(PLANES_ABI, PLANES_ADDRESS)
    const getAvailableProfitAllSources = await method.getAvailableProfitAllSources(address).call()
    return Number(getAvailableProfitAllSources) / 10**18
  } catch (error) {
    console.log({error})
    return error
  } 
}

export async function withdrawDepositProfitAll(addressUser) {
  console.log({addressUser},'tratando de retirar el dinero')
  try {
    const methodMember = await getContract(PLANES_ABI, PLANES_ADDRESS)
    
    const options = {
      from: addressUser,
      gasPrice: "10000000000", // 3 Gwei en unidades de gas (gwei * 1,000,000,000)
    }

    const getAvailableProfitAllSources = await methodMember.withdrawDepositProfitAll().send(options)
    console.log({getAvailableProfitAllSources})
    // return Number(getAvailableProfitAllSources) / 10**18
  } catch (error) {
    console.log({error})
    return error
  } 
}

