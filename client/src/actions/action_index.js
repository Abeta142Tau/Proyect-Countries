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
    }
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
