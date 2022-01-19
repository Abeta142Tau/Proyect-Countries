import React from "react";
import styles from "./Paged.module.css";

export default function Paged({ CountriesForPage, allCountries, paged }) {
  const pageNumbers = [];
  //obtengo el numero el pag en dependencia de la cant de country x pag y lo renderizo
  //aqui puedo intentar probar la lógica de 9 en la 1era pag, 10 en la otra.
  for (let i = 0; i < Math.ceil(allCountries / CountriesForPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {pageNumbers &&
          pageNumbers.map((page) => {
            return (
              <button
                key={page}
                className={styles.buttonNumber}
                onClick={() => paged(page)}
              >
                {page}
              </button>
            );
          })}
      </div>
    </nav>
  );
}
