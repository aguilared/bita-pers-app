import { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

const DATABASEURL = process.env.REACT_APP_BASE_URL;

const initialState = {
  histories: [],
  citas: [],
  isFetching: false,
  loading: false,
  hasError: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [loading, setLoading] = useState(true);
  //const DATABASEURL = "http://18.188.236.106:1337/api/v1/";
  const DATABASEURL = process.env.REACT_APP_BASE_URL;
  const apiUrlreservacionCitas = DATABASEURL + "reservacionCitas";
  const apiUrl = DATABASEURL + "histories";
  const [url, setUrl] = useState(apiUrl);
  //console.log("state> loading? url", state, loading, url);

  const [urlreservacionCitas, setUrlreservacionCitas] = useState(
    apiUrlreservacionCitas,
  );
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: "FETCH_HISTORIES_REQUEST",
      payload: "haciendo un request",
    });
    console.log("esta dentro de globalContect");
    const fetchData = async () => {
      try {
        const result = await axios(url);
        setLoading(false);
        dispatch({
          type: "FETCH_HISTORIES_SUCCESS",
          payload: result.data,
        });
      } catch (error) {
        //setIsError(true);
      }
    };
    //fetchData();
    setTimeout(fetchData, 1000);
  }, [url]);

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: "FETCH_CITAS_REQUEST",
      payload: "haciendo un request",
    });
    console.log("esta dentro de globalContect Citas");
    const fetchData = async () => {
      try {
        const result = await axios(urlreservacionCitas);
        console.log("globalContect Citas result", result);

        setLoading(false);
        dispatch({
          type: "FETCH_CITAS_SUCCESS",
          payload: result.data,
        });
      } catch (error) {
        //setIsError(true);
      }
    };
    //fetchData();
    setTimeout(fetchData, 1000);
  }, [urlreservacionCitas]);

  function removeHistorie(cedula) {
    const fetchData = async () => {
      const urlremove = DATABASEURL + "historie/deletehistorie/" + cedula;
      try {
        const result = await axios.delete(urlremove);
        console.log("result borrar", result);
        dispatch({
          type: "REMOVE_HISTORIE",
          payload: cedula,
        });
      } catch (error) {
        //setIsError(true);
      }
    };
    fetchData();
  }
  function addHistorie(historie) {
    const fetchData = async () => {
      const urlAdd = DATABASEURL + "historie/create";
      try {
        const result = await axios.post(urlAdd, historie);
        //console.log('result add', result.data.topsuceso);
        dispatch({
          type: "ADD_HISTORIE",
          payload: historie, //el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("error data ", error.response.data);
          console.log("error status ", error.response.status);
          console.log("error header ", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error request ", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message ", error.message);
        }
        console.log("Error config ", error.config);
        return error.response;
      }
    };
    fetchData();
  }
  function updateHistorie(historie) {
    const fetchData = async () => {
      const ENDPOINT = DATABASEURL + "historie/updateHistorie";
      try {
        const result = await axios.put(`${ENDPOINT}`, historie);
        dispatch({
          type: "EDIT_HISTORIE",
          payload: historie,
        });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("error data ", error.response.data);
          console.log("error status ", error.response.status);
          console.log("error header ", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error request ", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message ", error.message);
        }
        console.log("Error config ", error.config);
        return error.response;
      }
    };
    fetchData();
  }

  return (
    <GlobalContext.Provider
      value={{
        histories: state.histories,
        citas: state.citas,
        removeHistorie,
        updateHistorie,
        addHistorie,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
