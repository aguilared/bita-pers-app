import { Events } from "../interfaces/interfaces";
import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

import { AppReducerEvents } from "./AppReducerEvents";
import useBitacora from "../hooks/useBitacora";

const INITIAL_STATE: Events = {
  events: [],
  loading: false,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const EventsContext = createContext(INITIAL_STATE);

export const EventsProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducerEvents, INITIAL_STATE);
  const [loading, seLoading] = useState(false);
  const ENDPOINT = "http://192.168.0.106:3000/api/bitacora/events/admin";

  //const ENDPOINT = "http://localhost:3000/api/bitacora/events/";
  //const ENDPOINT1 = "http://localhost:3000/api/bitacora/events/events/";
  const { isBitacora, loadBitacora, bitacora } = useBitacora();
  //console.log("State", state);

  useEffect(() => {
    const fetchData = async () => {
      if (!isBitacora) {
        // no run reducer initial start
        console.log("No hay IDBitacora", bitacora);
        return;
      }
      dispatch({
        type: "REMOVE_BITA_EVENTS",
        payload: "Remove bitacora eventos anteriores",
      });
      try {
        //  const ENDPOINT = "http://localhost:3000/api/bitacora/events/";
        const result = await axios(`${ENDPOINT}${bitacora}`);
        console.log("EventsBitacora Result", result);
        dispatch({
          type: "FETCH_BITA_EVENTS_SUCCESS",
          payload: result.data,
        });
      } catch (err) {
        console.log("ERROR??", err);
      }
    };
    //fetchData();
    //setTimeout(fetchData, 1000);
    fetchData().catch(console.error);
  }, [ENDPOINT, isBitacora]);

  const addBitaEvent = useCallback((bitacora: any) => {
    const fetchData = async () => {
      console.log("Data a Save", bitacora);
      try {
        const result = await fetch("/api/bitacora/events/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bitacora),
        });
        const result1 = await fetch("/api/bitacora/events/top");
        const bitaEventTop = await result1.json();
        //console.log("TopAfterCreate", bitaEventTop);
        dispatch({
          type: "ADD_BITA_EVENT",
          payload: bitaEventTop, // el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        console.log("Error data", error);
        return error;
      }
    };
    fetchData();
  }, []);

  const editBitaEvent = useCallback((bitaEvent: any) => {
    const fetchData = async () => {
      //console.log("Edit Evento", bitaEvent);
      //console.log("bitaEvent.id", bitaEvent.id);
      try {
        const result = await fetch(
          "http://192.168.0.106:3000/api/bitacora/events/admin/edit",
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
  }, []);

  function removeBitaEvent(eventId: any) {
    const fetchData = async () => {
      try {
        const result = await fetch(
          "http://192.168.0.106:3000/api/bitacora/events/delete/" + eventId
        );
        //console.log("result borrar", result);
        // @ts-ignore
        if (!result.ok) {
          console.log("Un Error ocurrio", result);
        }
        dispatch({
          type: "REMOVE_EVENT",
          payload: eventId,
        });
      } catch (error) {
        //setIsError(true);
        console.log("Error borrar", error);
      }
    };
    fetchData();
  }

  const clearBitaEvents = () => {
    //setBitaEvents(null);
    //setBitaEvents(INITIAL_STATE1);
    //state.bitaEvents(null);
    console.log("CLEARED BitaEVENTS IN CONTEXT FILE"); // not cleared
  };
  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        addBitaEvent,
        editBitaEvent,
        removeBitaEvent,
        clearBitaEvents,
        loading,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
