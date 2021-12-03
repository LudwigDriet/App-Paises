import { HelpGetPaises } from "../../helpers/HelpGetPaises";

export const getPaises = () => {

  return (dispatch) => {
    //actualizar estado a pendiente
    dispatch(getPaisesPending());

    
    //peticion
    return HelpGetPaises('http://localhost:3001/countries')
    .then(res => dispatch(getPaisesFulfilled({
      post: res.data 
      
    })))
    .catch(error => dispatch(getPaisesRejected(error)))
  }
}

export const getPaisesPending = () => {
  return {
    type: "GET_PAISES_PENDING",
  }
}

export const getPaisesFulfilled = (paises) => {
  return {
    payload: paises,
    type: "GET_PAISES_FULFILLED",
  }
}

export const getPaisesRejected = (error) => {
  return {
    payload: error,
    type: "GET_PAISES_REJECTED",
  }
}