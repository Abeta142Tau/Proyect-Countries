const initialState = {
  allCountries: [],
  countries: [],
  countryDetail: [],
  activities: [],
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
    case "GET_COUNTRY_DETAIL":
      return {
        ...state,
        countryDetail: action.payload,
      };
    case "FILTER_BY_ACTIVITY":
      const filterActivity = state.allCountries;
      const activity =
        action.payload === "All Activities"
          ? filterActivity.filter((country) => country.activities.length > 0)
          : filterActivity.filter(
              (country) =>
                country.activities &&
                country.activities
                  .map((activity) => activity.name)
                  .includes(action.payload)
            );
      return {
        ...state,
        countries: activity,
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
      const allCountriesFilter = state.countries;
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
    case "FILTER_BY_POPULATION":
      let filterByPopulation =
        action.payload === "higher"
          ? state.countries.sort((a, b) => {
              return b.population - a.population;
            })
          : state.countries.sort((a, b) => {
              return a.population - b.population;
            });
      return {
        ...state,
        countries: filterByPopulation,
      };
    case "GET_ALL_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
