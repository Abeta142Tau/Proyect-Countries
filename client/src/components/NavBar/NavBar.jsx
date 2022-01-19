import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../actions/action_index";
import style from "./NavBar.module.css";

export default function NavBar({
  handleFilterBySort,
  handleFilterByContinent,
  handleFilterByPopulation,
  handleFilterByActivity,
}) {
  const activities = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className={style.containerselector}>
      <select
        className={style.selectorFilter}
        onChange={(e) => handleFilterBySort(e)}
      >
        <option>Filter Alphabetically...</option>
        <option value={"asc"}>Ascendent</option>
        <option value={"desc"}>Descendent</option>
      </select>
      <select
        className={style.selectorFilter}
        onChange={(e) => handleFilterByContinent(e)}
      >
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
      <select
        className={style.selectorFilter}
        onChange={(e) => handleFilterByPopulation(e)}
      >
        <option>Filter by Population</option>
        <option value="higher">Higher Population</option>
        <option value="lower">Lower Population</option>
      </select>
      <select
        className={style.selectorFilter}
        onChange={(e) => handleFilterByActivity(e)}
      >
        <option>Filter By Activities</option>
        <option value="All Activities">All Activities</option>
        {activities.map((activity) => (
          <option value={activity.name} key={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>
    </div>
  );
}
