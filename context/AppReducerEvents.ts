import { Events } from "../interfaces/interfaces";

export const AppReducerEvents = (state: Events, action: any): Events => {
  switch (action.type) {
    case "FETCH_BITA_EVENTS_REQUEST":
      //console.log("payload FETCH_BITA_EVENTS_REQUEST", action.payload);
      //console.log("El STATE", state);
      console.log("El STATE Events Request", state.events);
      return {
        ...state,
        loading: true,
      };
    case "FETCH_BITA_EVENTS_SUCCESS":
      console.log("El STATE Events", state.events);
      console.log("ActionPayload", action.payload);
      return Array.isArray(action.payload)
        ? {
            loading: false,
            events: [...state.events, ...action.payload],
          }
        : {
            ...state,
          };

    case "EDIT_BITA_EVENT":
      const updatedBitaEvent = action.payload;
      //console.log("payload ", action.payload);
      //console.log("El State to Update", state);
      console.log("StateEventAnt", state.events);
      console.log("toUpdatepayload", updatedBitaEvent);
      const updatedEvent = state.events.map((event) => {
        console.log("UpdateBitaEvent.id", updatedBitaEvent.id);
        console.log("state_event.id ", event.id);
        if (event.id === updatedBitaEvent.id) {
          console.log("ENTROOO ", event.id);
          return updatedBitaEvent;
        }
        return event;
      });
      return {
        ...state,
        events: updatedEvent,
      };

    case "REMOVE_EVENT":
      return {
        ...state,
        events: state.events.filter(
          (bitaevent) => bitaevent.id !== action.payload
        ),
      };
    case "REMOVE_BITA_EVENTS": //Remove todos los eventos de una Bitacora
      console.log("payload REMOVE_BITA_EVENTS", action.payload);

      return {
        ...state,
        events: state.events.filter(
          (bitaevents) => bitaevents.bitacora_id <= 0
        ),
      };
    case "ADD_BITA_EVENT":
      //console.log("payload ADD BITAEVENT", action.payload);
      //console.log("El STATE BITAEVENT SUCCESS", state.events);

      return Array.isArray(action.payload)
        ? {
            loading: false,
            events: [...action.payload, ...state.events],
          }
        : {
            ...state,
          };
    default:
      return state;
  }
};
