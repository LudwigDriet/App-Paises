
//ESTADO INICIAL DE PAISES
const initialState = {
    fetching: false,
    fetched: false,
    msg: "",
    data: {},
    error: null,
    totalResults: 0
  }

export const paisesReducer = (state = initialState, action) => {
    switch(action.type) {
      case "GET_PAISES_PENDING":
        return {
          ...state,
          fetching: true,
          msg: "Cargando petición"
        }
  
      case "GET_PAISES_FULFILLED":
        return {
          ...state,
          fetching: false,
          fetched: true,
          msg: "Petición exitosa",
          data: action.payload.post,
         
        }
  
      case "GET_PAISES_REJECTED":
        return {
          ...state,
          fetching: false,
          msg: "peticion rechazada",
          error: action.payload,
         
        }
      
      default: 
      return state
    }
  }