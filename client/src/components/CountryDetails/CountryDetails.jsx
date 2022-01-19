import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountryDetails } from "../../actions/action_index";
import style from "./CountryDetails.module.css";

export default function CountryDetails({ id }) {
  const dispatch = useDispatch();

  const country = useSelector((state) => state.countryDetail);
  useEffect(() => {
    dispatch(getCountryDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      <div className={style.container}>
        <div className={style.flag}>
          <img src={country.flagImage} alt="Loading" />
        </div>
        <div>
          <h2>{country.name}</h2>
          <h3>
            <strong>Capital: {country.capital}</strong>
          </h3>
          <h3>Continents: {country.continents}</h3>
          <h4>Subregion: {country.subregion}</h4>
          <h4>Area: {parseInt(country.area).toLocaleString()} km²</h4>
          <h4>Population: {parseInt(country.population).toLocaleString()} </h4>
          <h5>ID: {country.id}</h5>
        </div>
        <div className={style.activitiesContainer}>
          <div>
            <h2>Actvities: </h2>
            {country.activities && country.activities.length > 0 ? (
              country.activities.map((activity) => {
                return (
                  <div className={style.activities}>
                    <div className={style.activitiesCard} key={activity.id}>
                      <h3>Name: {activity.name} </h3>
                      <h4>Duration: {activity.duration} hr</h4>
                      <h4>Season: {activity.season} </h4>
                      <h4>Difficulty: {activity.difficulty} </h4>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h2>This country don´t have still any activities</h2>
                <Link to="/postActivity">
                  <h3> Do you want create a activity?</h3>
                </Link>
              </div>
            )}
            <Link to="/home">
              <button className={style.button}>Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
