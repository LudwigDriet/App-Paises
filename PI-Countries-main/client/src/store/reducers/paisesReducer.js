//ESTADO INICIAL DE PAISES
const initialState = {
  fetching: false,
  fetched: false,
  msg: "",
  data: {},
  error: null,
};

export const paisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PAISES_PENDING":
      return {
        ...state,
        fetching: true,
        msg: "Cargando petición",
      };

    case "GET_PAISES_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        msg: "Petición exitosa",
        data: action.payload.post,
      };

    case "GET_PAISES_REJECTED":
      return {
        ...state,
        fetching: false,
        msg: "peticion rechazada",
        error: action.payload,
      };
    case "GET_PAISES_FILTRADOS":
      return {
        ...state,
        fetching: false,
        fetched: true,
        msg: "Petición exitosaaaaaaa",
        data: action.payload,
      };

    case "PAISES_RESET":
      return {
        ...state,
        fetching: false,
        fetched: false,
        msg: "",
        data: {},
        error: null,
      };

    default:
      return state;
  }
};
