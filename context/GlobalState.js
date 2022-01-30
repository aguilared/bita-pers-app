import axios from 'axios';
import React, { createContext, useReducer, useState, useEffect } from 'react';

import AppReducer from './AppReducer';
const initialState = {
  activities: [],
  isFetching: false,
  loading: false,
  hasError: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [loading, setLoading] = useState(true);
  const DATABASEURL = 'http://192.168.0.105:1337/api/v1/';
  //const DATABASEURL = 'http://3.15.169.202:1337/api/v1/';
  //const DATABASEURL = process.env.REACT_APP_BASE_URL;
  const apiUrl = DATABASEURL + 'activities';
  const [url, setUrl] = useState(apiUrl);
  //console.log("state> loading? url", state, loading, url);

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'FETCH_ACTIVITIES_REQUEST',
      payload: url,
    });
    const fetchData = async () => {
      try {
        const result = await axios(url);
        setLoading(false);
        console.log('Results', result);
        dispatch({
          type: 'FETCH_ACTIVITIES_SUCCESS',
          payload: result.data,
        });
      } catch (error) {
        //setIsError(true);
      }
    };
    //fetchData();
    setTimeout(fetchData, 1000);
  }, [url]);

  function removeActivitie(id) {
    const fetchData = async () => {
      const urlremove = DATABASEURL + 'activities/delete/' + id;
      try {
        const result = await axios.delete(urlremove);
        console.log('result borrar', result);
        dispatch({
          type: 'REMOVE_ACTIVITIE',
          payload: id,
        });
      } catch (error) {
        //setIsError(true);
      }
    };
    fetchData();
  }
  function addActivitie(activitie) {
    const fetchData = async () => {
      const urlAdd = DATABASEURL + 'activities/create';
      try {
        const result = await axios.post(urlAdd, activitie);
        console.log('result add', result);
        console.log('result add', result.data.res);
        dispatch({
          type: 'ADD_ACTIVITIE',
          payload: result.data.res, //el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        if (error.response) {
          console.log('error data ', error.response.data);
          console.log('error status ', error.response.status);
          console.log('error header ', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('error request ', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message ', error.message);
          console.log('result add', result);
        }
        console.log('Error config ', error.config);
        console.log('result add', result);

        return error.response;
      }
    };
    fetchData();
  }
  function updateActivitie(activitie) {
    const fetchData = async () => {
      const ENDPOINT = DATABASEURL + 'activities/update';
      try {
        const result = await axios.put(`${ENDPOINT}`, activitie);
        dispatch({
          type: 'EDIT_ACTIVITIE',
          payload: activitie,
        });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('error data ', error.response.data);
          console.log('error status ', error.response.status);
          console.log('error header ', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('error request ', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message ', error.message);
        }
        console.log('Error config ', error.config);
        return error.response;
      }
    };
    fetchData();
  }

  return (
    <GlobalContext.Provider
      value={{
        activities: state.activities,
        removeActivitie,
        updateActivitie,
        addActivitie,
        loading,
        setLoading,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
