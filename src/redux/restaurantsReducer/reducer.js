import {
  GET_RESTAURANTS_REQUEST,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAILURE,
  FILTER_RESTAURANTS_REQUEST,
  FILTER_RESTAURANTS_SUCCESS,
  FILTER_RESTAURANTS_FAILURE,
} from "./actionTypes";

const initialState = {
  isRestosLoading: false,
  error: false,
  restos: [],
  filteredRestos: [],
};

export const restaurantsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RESTAURANTS_REQUEST: {
      return { ...state, isRestosLoading: true };
    }

    case GET_RESTAURANTS_SUCCESS: {
      return {
        ...state,
        isRestosLoading: false,
        restos: payload,
        filteredRestos: payload,
      };
    }

    case GET_RESTAURANTS_FAILURE: {
      return { ...state, error: true, isRestosLoading: false };
    }

    case FILTER_RESTAURANTS_REQUEST: {
      return { ...state, isRestosLoading: true };
    }

    case FILTER_RESTAURANTS_SUCCESS: {
      return { ...state, filteredRestos: payload, isRestosLoading: false };
    }

    case FILTER_RESTAURANTS_FAILURE: {
      return { ...state, error: true, isRestosLoading: false };
    }

    default:
      return state;
  }
};
