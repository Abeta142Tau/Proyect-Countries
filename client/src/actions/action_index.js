import axios from "axios";

export function getAllCountries() {
  return async function (dispatch) {
    try {
      let countries = await axios.get("http://localhost:3001/countries");
      return dispatch({
        type: "GET_ALLCOUNTRIES",
        payload: countries.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCountriesByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      return dispatch({
        type: "GET_COUNTRIES_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    try {
      let activity = await axios.post(
        "http://localhost:3001/activity",
        payload
      );
      return activity;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCountryDetails(id) {
  return async function (dispatch) {
    try {
      let country = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: "GET_COUNTRY_DETAIL",
        payload: country.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/* export function getActivities() {
  return async function (dispatch) {
    try {
      let activities = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: "GET_ALL_ACTIVITIES",
        payload: activities.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
} */

export function getActivities() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/activities")
      .then((response) => {
        return dispatch({
          type: "GET_ALL_ACTIVITIES",
          payload: response.data,
        });
      })
      .catch((e) => console.log(e));
  };
}

export function filterByContinents(payload) {
  return {
    type: "FILTER_BY_CONTINENTS",
    payload,
  };
}

export function filterBySort(payload) {
  return {
    type: "FILTER_BY_SORT",
    payload,
  };
}

export function filterByPopulation(payload) {
  return {
    type: "FILTER_BY_POPULATION",
    payload,
  };
}

export function filterByActivity(payload) {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload,
  };
}
