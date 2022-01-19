import React from "react";
import { Link } from "react-router-dom";
import styles from "./CountryCard.module.css";

export default function CountryCard({ name, flagImage, continents, id }) {
  return (
    <div className={styles.container}>
      <Link to={`/countries/${id}`}>
        <img className={styles.imgFlag} src={flagImage} alt="Loading" />
        <h3>{name}</h3>
        <h4>{continents} </h4>
      </Link>
    </div>
  );
}
