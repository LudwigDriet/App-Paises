import { HelpGetPaises } from "../../helpers/HelpGetPaises";

export const getPaisesFiltrados = (data) => {
  return (dispatch) => {
    dispatch(agregarFiltrado(data));
  };
};

export const getPaises = (URL) => {
  return (dispatch) => {
    //actualizar estado a pendiente
    dispatch(getPaisesPending());

    //peticion
    return HelpGetPaises(URL)
      .then((res) =>
        dispatch(
          getPaisesFulfilled({
            post: res.data,
          })
        )
      )
      .catch((error) => dispatch(getPaisesRejected(error)));
  };
};

const agregarFiltrado = (data) => {
  return {
    payload: data,
    type: "GET_PAISES_FILTRADOS",
  };
};

const getPaisesPending = () => {
  return {
    type: "GET_PAISES_PENDING",
  };
};

const getPaisesFulfilled = (paises) => {
  return {
    payload: paises,
    type: "GET_PAISES_FULFILLED",
  };
};

const getPaisesRejected = (error) => {
  return {
    payload: error,
    type: "GET_PAISES_REJECTED",
  };
};

export const resetearPaises = () => {
  return {
    payload: {},
    type: "PAISES_RESET",
  };
};
