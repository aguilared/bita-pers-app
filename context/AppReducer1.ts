import { TodoState } from "../interfaces/interfaces";

export const AppReducer = (state: TodoState, action: any): TodoState => {
  switch (action.type) {
    case "FETCH_BITACORAS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "FETCH_BITACORAS_SUCCESS":
      return Array.isArray(action.payload)
        ? {
            loading: false,
            bitacoras1: [...state.bitacoras1, ...action.payload],
          }
        : {
            ...state,
          };

    case "FETCH_BITACORAS_FAILURE":
      return {
        ...state,
        bitacoras1: [...state.bitacoras1, ...action.payload], // agrega mas datos al array
      };

    case "LOAD_BITACORAS_SUCCESS":
      return {
        ...state,
        loading: false,
        bitacoras1: [...state.bitacoras1, ...action.payload], // agrega mas datos al array
      };

    case "ADD_BITACORA":
      return Array.isArray(action.payload)
        ? {
            loading: false,
            bitacoras1: [...action.payload, ...state.bitacoras1],
          }
        : {
            ...state,
          };

    case "REMOVE_BITACORA":
      return {
        ...state,
        bitacoras1: state.bitacoras1.filter(
          (bitacora) => bitacora.id !== action.payload
        ),
      };

    case "EDIT_BITACORA":
      const updatedBitacora = action.payload;

      const updatedBitacoras = state.bitacoras1.map((bitacora) => {
        if (bitacora.id === updatedBitacora.id) {
          return updatedBitacora;
        }
        return bitacora;
      });
      return {
        ...state,
        bitacoras1: updatedBitacoras,
      };

    case "EDIT_BITACORA_NEW_EVENT":
      const updatedBitacoraN = action.payload;

      const updatedBitacorasN = state.bitacoras1.map((bitacora) => {
        if (bitacora.id === updatedBitacoraN.id) {
          return updatedBitacoraN;
        }
        return bitacora;
      });
      return {
        ...state,
        bitacoras1: updatedBitacorasN,
      };

    case "FETCH_BITACORA_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_BITACORA_ID_SUCCESS":
      return Array.isArray(action.payload)
        ? {
            loading: false,
            bitacoras1: [...state.bitacoras1, ...action.payload],
          }
        : {
            ...state,
          };

    default:
      return state;
  }
};
