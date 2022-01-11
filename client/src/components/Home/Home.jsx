import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllCountries,
  filterByContinents,
  filterBySort,
} from "../../actions/action_index";
import CountryCard from "../ContryCard/CountryCard";
import styles from "./Home.module.css";
import Paged from "../Paged/Paged";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const countriesModify = useSelector((state) => state.countries);

  const [, setSortOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //state del num pag
  const [CountriesForPage] = useState(9);
  const indexOfLastCountry = CountriesForPage * currentPage; //10
  const indexOfFirstCountry = indexOfLastCountry - CountriesForPage; //10-10=0
  const currentCountriesForPage = countriesModify.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
  }

  function handleFilterByContinent(e) {
    e.preventDefault();
    dispatch(filterByContinents(e.target.value));
  }

  function handleFilterBySort(e) {
    e.preventDefault();
    dispatch(filterBySort(e.target.value));
    setCurrentPage(1);
    setSortOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <Fragment>
      <div>
        <SearchBar />
        <Link to="/postActivity">Post Activity</Link>

        <button onClick={(e) => handleClick(e)}>Reset </button>
        <select onChange={(e) => handleFilterBySort(e)}>
          <option>Filter Alphabetically...</option>
          <option value={"asc"}>Ascendent</option>
          <option value={"desc"}>Descendent</option>
        </select>
        <select onChange={(e) => handleFilterByContinent(e)}>
          <option>Filter by Continent...</option>
          <option value="All">All Continets</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="North America">Noth America</option>
          <option value="South America">South America</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
        </select>

        <select>
          <option value="All Activities">All Activities</option>
        </select>
      </div>

      <div>
        <Paged
          CountriesForPage={CountriesForPage}
          allCountries={countriesModify.length}
          paged={paged}
        />
      </div>

      <div className={styles.containerCountry}>
        {currentCountriesForPage?.map((country) => (
          <CountryCard
            name={country.name}
            flagImage={country.flagImage}
            continents={country.continents}
            id={country.id}
            key={country.id}
          />
        ))}
      </div>
    </Fragment>
  );
}
