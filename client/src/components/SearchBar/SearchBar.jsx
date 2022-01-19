import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../actions/action_index";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [nameCountry, setNameCountry] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setNameCountry("");
    setNameCountry(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountriesByName(nameCountry));
    setNameCountry("");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder=" Search Country By Name..."
        className={style.labelSearch}
        onChange={(e) => handleInputChange(e)}
      />
      <button className={style.buttonSearch} type="submit">
        Search
      </button>
    </form>
  );
}
