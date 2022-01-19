import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllCountries,
  filterByContinents,
  filterBySort,
  filterByPopulation,
  filterByActivity,
} from "../../actions/action_index";
import CountryCard from "../ContryCard/CountryCard";
import style from "./Home.module.css";
import Paged from "../Paged/Paged";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";

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
    setCurrentPage(1);
    setSortOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterBySort(e) {
    e.preventDefault();
    dispatch(filterBySort(e.target.value));
    setCurrentPage(1);
    setSortOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterByPopulation(e) {
    e.preventDefault();
    dispatch(filterByPopulation(e.target.value));
    setCurrentPage(1);
    setSortOrden(`Oredenado ${e.target.value}`);
  }

  function handleFilterByActivity(e) {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1);
    setSortOrden(`Oredenado ${e.target.value}`);
  }

  return (
    <Fragment>
      <div className={style.containerHome}>
        <SearchBar className={style.searchBar} />

        <Link to="/postActivity">
          <button className={style.buttonReload}>Post Activity</button>
        </Link>

        <button className={style.buttonReload} onClick={(e) => handleClick(e)}>
          Reload
        </button>

        <NavBar
          handleFilterBySort={handleFilterBySort}
          handleFilterByContinent={handleFilterByContinent}
          handleFilterByPopulation={handleFilterByPopulation}
          handleFilterByActivity={handleFilterByActivity}
        />
      </div>

      <div>
        <Paged
          CountriesForPage={CountriesForPage}
          allCountries={countriesModify.length}
          paged={paged}
        />
      </div>

      <div className={style.containerCountry}>
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
