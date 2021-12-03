// https://es.redux.js.org/docs/avanzado/acciones-asincronas.html
import { HelpGetQuery } from "../../helpers/HelpGetQuery/HelpGetQuery";

export const getFake = () => {

  return (dispatch) => {
    //actualizar estado a pendiente
    dispatch(getFakePending());

    //peticion
    return HelpGetQuery('https://jsonplaceholder.typicode.com/posts')
    .then(response => dispatch(getFakeFulfilled({
      post: response.data, 
      status: response.status
    })))
    .catch(error => dispatch(getFakeRejected(error)))
  }
}

export const getFakePending = () => {
  return {
    type: "GET_FAKE_PENDING",
  }
}

export const getFakeFulfilled = (fake) => {
  return {
    payload: fake,
    type: "GET_FAKE_FULFILLED",
  }
}

export const getFakeRejected = (error) => {
  return {
    payload: error,
    type: "GET_FAKE_REJECTED",
  }
}