import React from "react";
import { Link } from "react-router-dom";
import style from "./LandinPage.module.css";

export function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.textos}>
        <h1>Welcome to my Country App</h1>
        <p className={style.text}>
          <strong>
            This is a project developed in the Labs stage of Henry's bootcamp. I
            invite you to know a little about the countries around the world
          </strong>
        </p>
        <h3>Developed By: José Luis Riverón</h3>

        <Link to="/home">
          <button className={style.button}>Let's Go...</button>
        </Link>
      </div>
    </div>
  );
}
