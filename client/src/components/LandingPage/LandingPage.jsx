import React from "react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div>
      <h1>Wellcome to Country App</h1>
      <h4>By: José Luis Riverón</h4>
      <Link to="/home">
        <button>Start</button>
      </Link>
    </div>
  );
}
