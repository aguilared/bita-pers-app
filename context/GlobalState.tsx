import { TodoState } from "../interfaces/interfaces";
import React, { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";

import { AppReducer } from "./AppReducer";

const INITIAL_STATE: TodoState = {
  bitacoras1: [],
  loading: false,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const GlobalContext = createContext(INITIAL_STATE);

export const GlobalProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const ENDPOINT = "http://192.168.0.101:3000/api/bitacora/events";

  useEffect(() => {
    setLoading(true);
    const setBitacoraList = async () => {
      try {
        dispatch({
          type: "FETCH_BITACORAS_REQUEST",
          payload: "Haciendo un Request",
        });
        const result = await axios(`${ENDPOINT}`);
        // console.log("List Bitacoras Result", result);
        dispatch({
          type: "FETCH_BITACORAS_SUCCESS",
          payload: result.data,
        });
        setLoading(false);
      } catch (error) {
        //setIsError(true);
      }
    };
    setBitacoraList();
  }, [ENDPOINT]);

  async function addBitacora(bitacora: any) {
    const fetchData = async () => {
      const result = await fetch("/api/bitacora/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bitacora),
      });
      if (!result.ok) {
        const message = `An error has occured: ${result.status}`;
        throw new Error(message);
      }
      const result1 = await fetch("/api/bitacora/top");
      const bitacoraTop = await result1.json();
      //console.log("TopAfterCreate", bitacoraTop);
      dispatch({
        type: "ADD_BITACORA",
        payload: bitacoraTop, // el endpoint devuelve el id nuevo creado.
      });
    };
    fetchData().catch((error) => {
      error.message; // 'An error has occurred: 404'
    });
  }

  async function editBitacora(bitacora: any) {
    //console.log("DataRecibida", bitacora.id);
    try {
      const result = await fetch("/api/bitacora/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bitacora),
      });
      const result1 = await fetch("/api/bitacora/" + bitacora.id);
      const bitacoraupdate = await result1.json(); //bitacora + name of relation

      dispatch({
        type: "EDIT_BITACORA",
        payload: bitacoraupdate, // el endpoint devuelve el id nuevo creado.
      });
    } catch (error) {
      //console.log("Error data", error);
    }
  }

  async function editBitacoraNewEvent(bitacoraId: any) {
    const fetchData = async () => {
      console.log("DataRecibidaNewEvent", bitacoraId);
      try {
        const result1 = await fetch("/api/bitacora/" + bitacoraId);
        const bitacoraupdate = await result1.json(); //bitacora + name of relation
        console.log("Actualizar Result", bitacoraupdate);
        dispatch({
          type: "EDIT_BITACORA_NEW_EVENT",
          payload: bitacoraupdate, // el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        console.log("Error data", error);
      }
    };
    fetchData();
  }

  async function removeBitacora(bitacoraId: any) {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/bitacora/delete/" + bitacoraId);
        //console.log("result borrar", result);
        // @ts-ignore
        if (!result.ok) {
          console.log("Un Error ocurrio", result);
        }
        dispatch({
          type: "REMOVE_BITACORA",
          payload: bitacoraId,
        });
      } catch (error) {
        //setIsError(true);
        console.log("Error borrar", error);
      }
    };
    fetchData();
  }

  async function editBitaEvent(bitaEvent: any) {
    const fetchData = async () => {
      //console.log("Edit Evento", bitaEvent);
      //console.log("bitaEvent.id", bitaEvent.id);
      try {
        const result = await fetch(
          "http://192.168.0.101:3000/api/bitacora/events/admin/edit",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bitaEvent),
          }
        );
        //console.log("result editEvent", result);
        //const result1 = await axios(`${ENDPOINT}${bitacora.bitacora_id}`);
        //console.log("EventResult111", result1.data);
        dispatch({
          type: "EDIT_BITA_EVENT",
          payload: bitaEvent, //
        });
      } catch (error) {
        console.log("Error data", error);
      }
    };
    fetchData();
  }

  return (
    <GlobalContext.Provider
      value={{
        bitacoras1: state.bitacoras1,
        addBitacora,
        editBitacora,
        editBitacoraNewEvent,
        removeBitacora,
        editBitaEvent,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
