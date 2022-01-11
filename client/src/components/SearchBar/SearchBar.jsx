import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../actions/action_index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [nameCountry, setNameCountry] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setNameCountry(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountriesByName(nameCountry));
    setNameCountry("");
    console.log("llegué al final");
  }

  return (
    <div>
      <input
        type="text"
        placeholder=" Search Country By Name..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
