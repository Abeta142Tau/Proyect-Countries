import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllCountries, postActivity } from "../../actions/action_index";
import style from "./PostActivity.module.css";

function validate(input) {
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let errors = {};

  if (!input.name.trim()) {
    errors.name = "Name requered";
  } else if (!regexName.test(input.name.trim())) {
    errors.name = "The label name only acept string characters";
  }

  if (!input.duration.trim()) {
    errors.duration = "Durations is requered";
  } else if (input.duration < 1 || input.duration > 20) {
    errors.duration = "Durations should be a number between 1 y 20";
  }

  if (!input.season) {
    errors.season = "Season should be checked";
  }

  if (!input.difficulty) {
    errors.difficulty = "Difficulty should be checked";
  }

  if (input.countries.length === 0) {
    errors.countries = "Please select a country";
  }

  return errors;
}

export default function PostActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const select = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== el),
    });
  }

  function handleChangeName(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleChangeDuration(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckSeason(e) {
    if (e.target.checked === true) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckDifficulty(e) {
    if (e.target.checked === true) {
      setInput({
        ...input,
        difficulty: e.target.value,
      });
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (input.countries.includes(e.target.value)) {
      alert("This country has been select");
    } else {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
    }
    setErrors(
      validate({
        ...input,
        countries: [...input.countries, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.difficulty ||
      !input.countries ||
      !input.season ||
      !input.duration ||
      Object.entries(errors).length !== 0
    ) {
      alert("All label are requered or review your errors");
    } else {
      dispatch(postActivity(input));
      alert("Activity Created");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
      history.push("/home");
    }
  }

  return (
    <Fragment>
      <div className={style.containerForm}>
        <div>
          <h1>Create Activity</h1>
        </div>
        <form>
          <div className={style.inputs}>
            <label>
              <strong>Name: </strong>
            </label>
            <input
              type="text"
              value={input.name}
              name="name"
              className={style.borderInput}
              onChange={(e) => handleChangeName(e)}
            />
            {errors.name && <p className={style.labelErrors}>{errors.name}</p>}
          </div>
          <div className={style.inputs}>
            <label>
              {" "}
              <strong>Duration in hours: </strong>
            </label>
            <input
              type="number"
              value={input.duration}
              name="duration"
              className={style.borderInput}
              onChange={(e) => handleChangeDuration(e)}
            />
            {errors.duration && (
              <p className={style.labelErrors}>{errors.duration}</p>
            )}
          </div>
          <div>
            <label>
              <strong>Season: </strong>
            </label>
            <label>
              <input
                type="radio"
                value="Winter"
                name="season"
                className={style.borderInput}
                onChange={(e) => handleCheckSeason(e)}
              />
              <strong>Winter</strong>
            </label>
            <label>
              <input
                type="radio"
                value="Autumn"
                name="season"
                onChange={(e) => handleCheckSeason(e)}
              />
              <strong>Autumn</strong>
            </label>
            <label>
              <input
                type="radio"
                value="Summer"
                name="season"
                onChange={(e) => handleCheckSeason(e)}
              />
              <strong>Summer</strong>
            </label>
            <label>
              <input
                type="radio"
                value="Spring"
                name="season"
                onChange={(e) => handleCheckSeason(e)}
              />
              <strong>Spring</strong>
            </label>
            {errors.season && (
              <p className={style.labelErrors}>{errors.season}</p>
            )}
          </div>
          <div>
            <label>
              <strong>Difficulty: </strong>
            </label>
            <label>
              <input
                type="radio"
                value="1"
                name="difficulty"
                onChange={(e) => handleCheckDifficulty(e)}
              />
              <strong>1</strong>
            </label>
            <label>
              <input
                type="radio"
                value="2"
                name="difficulty"
                onChange={(e) => handleCheckDifficulty(e)}
              />
              <strong>2</strong>
            </label>
            <label>
              <input
                type="radio"
                value="3"
                name="difficulty"
                onChange={(e) => handleCheckDifficulty(e)}
              />
              <strong>3</strong>
            </label>
            <label>
              <input
                type="radio"
                value="4"
                name="difficulty"
                onChange={(e) => handleCheckDifficulty(e)}
              />
              <strong>4</strong>
            </label>
            <label>
              <input
                type="radio"
                value="5"
                name="difficulty"
                onChange={(e) => handleCheckDifficulty(e)}
              />
              <strong>5</strong>
            </label>
            {errors.difficulty && (
              <p className={style.labelErrors}>{errors.difficulty}</p>
            )}
          </div>
          <div>
            <label>
              <strong>Select one or more countries: </strong>
            </label>
            <select
              className={style.borderInput}
              onChange={(e) => handleSelect(e)}
            >
              <option>Select a country</option>
              {select.map((country) => (
                <option value={country.name} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countries && (
              <p className={style.labelErrors}>{errors.countries}</p>
            )}
          </div>
          {input.countries.map((el) => (
            <div key={el} className={style.selectDelete}>
              <button
                className={style.buttonDelete}
                key={el}
                value={el.name}
                onClick={() => handleDelete(el)}
              >
                X
              </button>
              <p>
                <strong>{el}</strong>
              </p>
            </div>
          ))}
          <div>
            <Link to="/home">
              <button className={style.buttons}>
                <strong>Back to Home</strong>
              </button>
            </Link>
            <button
              className={style.buttons}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              <strong>Create Activity</strong>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
