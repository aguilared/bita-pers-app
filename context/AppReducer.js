export default function AppReducer(state, action) {
  switch (action.type) {
    case 'FETCH_ACTIVITIES_REQUEST':
      console.log('payload FETCH_ACTIVITIES_REQUEST', action.payload);
      return {
        ...state,
        isFetching: true,
        loading: true,
        hasError: false,
      };
    case 'FETCH_ACTIVITIES_SUCCESS':
      /*console.log('payload FETCH_ACTIVITIES_SUCCESS', action.payload);
      console.log('el state FETCH_ACTIVITIES_SUCCESS', state); */
      /*console.log(
        "es array FETCH_SUCESOS_SUCCESS",
        Array.isArray(action.payload)
      );*/
      return {
        ...state,
        isFetching: false,
        loading: false,
        //ACTIVITIES: action.payload,
        activities: [...state.activities, ...action.payload], //agrega mas datos al array
      };
    case 'FETCH_ACTIVITIES_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case 'LOAD_ACTIVITIES_SUCCESS':
      console.log('payload LOAD_ACTIVITIES_SUCCESS', action.payload);
      //console.log('el state LOAD_ACTIVITIES_SUCCESS', state.activities);
      /*console.log(
        'es array LOAD_ACTIVITIES_SUCCESS',
        Array.isArray(action.payload)
      ); */

      return {
        ...state,
        isFetching: false,
        loading: false,
        activities: [...state.activities, ...action.payload], //agrega mas datos al array
      };
    case 'REMOVE_ACTIVITIE':
      return {
        ...state,
        activities: state.activities.filter(
          (activitie) => activitie.id !== action.payload
        ),
      };

    case 'ADD_ACTIVITIE':
      console.log('payload ADD_ACTIVITIES', action.payload);
      console.log('el state ADD_ACTIVITIES', state.activities);
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };

    case 'EDIT_ACTIVITIE':
      const updatedActivitie = action.payload;
      console.log('updateActivitiepyload', updatedActivitie);
      const updatedActivities = state.activities.map((activitie) => {
        console.log('activitieID', activitie.id);
        console.log('updatedActivitie.id', updatedActivitie.id);
        if (String(activitie.id) === updatedActivitie.id) {
          console.log('updateActivitieesIgual', updatedActivitie);
          return updatedActivitie;
        }
        return activitie;
      });
      return {
        ...state,
        activities: updatedActivities,
      };

    case 'FETCH_CITAS_REQUEST':
      console.log('payload FETCH_CITAS_REQUEST', action.payload);
      return {
        ...state,
        isFetching: true,
        loading: true,
        hasError: false,
      };
    case 'FETCH_CITAS_SUCCESS':
      console.log('payload FETCH_CITAS_SUCCESS', action.payload);
      console.log('el state FETCH_CITAS_SUCCESS', state.citas);
      /*console.log(
        "es array FETCH_CITAS_SUCCESS",
        Array.isArray(action.payload)
      );*/
      return {
        ...state,
        isFetching: false,
        loading: false,
        //citas: action.payload,
        citas: [...state.citas, ...action.payload], //agrega mas datos al array
      };
    case 'FETCH_CITAS_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case 'LOAD_CITAS_SUCCESS':
      console.log('payload LOAD_CITAS_SUCCESS', action.payload);
      console.log('el state LOAD_CITAS_SUCCESS', state.citas);
      console.log('es array LOAD_citas_SUCCESS', Array.isArray(action.payload));

      return {
        ...state,
        isFetching: false,
        loading: false,
        citas: [...state.citas, ...action.payload], //agrega mas datos al array
      };
    case 'REMOVE_CITA':
      return {
        ...state,
        citas: state.citas.filter((cita) => cita.cedula !== action.payload),
      };
    case 'ADD_CITA':
      return {
        ...state,
        citas: [...state.citas, action.payload],
      };

    default:
      return state;
  }
}
