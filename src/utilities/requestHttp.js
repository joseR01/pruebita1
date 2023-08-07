import {URLApi} from "./networks" 
import axios from 'axios'


export const getDatosDecryptServer = async (encryptUser) => {
  try {
    let result = await axios.post(URLApi + "/api/v1/data/decrypt",{data: encryptUser});
    let userDeScrypt = JSON.parse(result.data.data);
    return userDeScrypt;

  } catch (error) {
    console.log(error);
  }
}
