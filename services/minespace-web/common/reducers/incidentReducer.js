import * as actionTypes from "../constants/actionTypes";
import { INCIDENTS } from "../constants/reducerTypes";

const initialState = {
  incidents: [],
  incidentPageData: {},
  mineIncidents: [],
  mineIncidentNotes: [],
};

export const incidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_INCIDENTS:
      return {
        ...state,
        incidents: action.payload.records,
        incidentPageData: action.payload,
      };
    case actionTypes.STORE_MINE_INCIDENTS:
      return {
        ...state,
        mineIncidents: action.payload.records,
      };
    case actionTypes.STORE_MINE_INCIDENT_NOTES:
      return {
        ...state,
        mineIncidentNotes: action.payload.records,
      };
    default:
      return state;
  }
};

const incidentReducerObject = {
  [INCIDENTS]: incidentReducer,
};

export const getIncidents = (state) => state[INCIDENTS].incidents;
export const getIncidentPageData = (state) => state[INCIDENTS].incidentPageData;
export const getMineIncidents = (state) => state[INCIDENTS].mineIncidents;
export const getMineIncidentNotes = (state) => state[INCIDENTS].mineIncidentNotes;

export default incidentReducerObject;
