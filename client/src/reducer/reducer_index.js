const initialState = {
  allCountries: [],
  countries: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALLCOUNTRIES":
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
      };
    case "GET_COUNTRIES_BY_NAME":
      return {
        ...state,
        countries: action.payload,
      };
    case "FILTER_BY_CONTINENTS":
      const allCountries = state.allCountries;
      const countriesFilter =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((el) => el.continents === action.payload);
      return {
        ...state,
        countries: countriesFilter,
      };
    case "FILTER_BY_SORT":
      const allCountriesFilter = state.allCountries;
      action.payload === "asc"
        ? allCountriesFilter.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          })
        : allCountriesFilter.sort(function (a, b) {
            return b.name.localeCompare(a.name);
          });
      return {
        ...state,
        countries: allCountriesFilter,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
