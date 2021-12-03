
//ESTADO INICIAL DE FAKE
const initialState = {
    fetching: false,
    fetched: false,
    msg: "",
    data: {},
    error: null,
    status: 0,
    totalResults: 0
  }

export const fakeReducer = (state = initialState, action) => {
    switch(action.type) {
      case "GET_FAKE_PENDING":
        return {
          ...state,
          fetching: true,
          msg: "Cargando petición"
        }
  
      case "GET_FAKE_FULFILLED":
        return {
          ...state,
          fetching: false,
          fetched: true,
          msg: "Petición exitosa",
          data: action.payload.post,
          status: action.payload.status,
        }
  
      case "GET_FAKE_REJECTED":
        return {
          ...state,
          fetching: false,
          msg: "peticion rechazada",
          error: action.payload,
          status: action.payload.status,
        }
      
      default: 
      return state
    }
  }