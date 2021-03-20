import {
  GET_RESTAURANTS_REQUEST,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAILURE,
  FILTER_RESTAURANTS_REQUEST,
  FILTER_RESTAURANTS_SUCCESS,
  FILTER_RESTAURANTS_FAILURE,
} from "./actionTypes";
import axios from "axios";

export const getRestaurantsRequest = () => ({
  type: GET_RESTAURANTS_REQUEST,
});

export const getRestaurantsSuccess = (payload) => ({
  type: GET_RESTAURANTS_SUCCESS,
  payload,
});

export const getRestaurantsFailure = () => ({
  type: GET_RESTAURANTS_FAILURE,
});

export const getRestaurants = () => async (dispatch) => {
  dispatch(getRestaurantsRequest());

  const config = {
    method: "get",
    url: "https://serverfake.herokuapp.com/topRamen",
  };

  try {
    const restos = await axios(config);
    dispatch(getRestaurantsSuccess(restos.data));
  } catch (err) {
    dispatch(getRestaurantsFailure());
  }
};

export const filterRestaurantsRequest = (payload) => ({
  type: FILTER_RESTAURANTS_REQUEST,
  payload,
});

export const filterRestaurantsSuccess = (payload) => ({
  type: FILTER_RESTAURANTS_SUCCESS,
  payload,
});

export const filterRestaurantsFailure = () => ({
  type: FILTER_RESTAURANTS_FAILURE,
});

export const filterRestaurants = (payload) => async (dispatch) => {
  dispatch(filterRestaurantsRequest(payload));

  let { category, item } = payload;
  let url;
  if (category === "Rank" || category === "Year") {
    category = "Top Ten";
    if (item[0] === "#") {
      item = item.split("#")[1];
    }
    url = `https://serverfake.herokuapp.com/topRamen?${category}_like=${item}`;
  } else {
    url = `https://serverfake.herokuapp.com/topRamen?${category}=${item}`;
  }

  const config = {
    method: "get",
    url: url,
  };

  try {
    const restos = await axios(config);
    dispatch(filterRestaurantsSuccess(restos.data));
  } catch (err) {
    dispatch(filterRestaurantsFailure());
  }
};
