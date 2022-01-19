import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import PostActivity from "./components/PostActivity/PostActivity";
import CountryDetails from "./components/CountryDetails/CountryDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home/" component={Home} />
          <Route path="/postActivity" component={PostActivity} />
          <Route
            path="/countries/:id"
            render={({ match }) => <CountryDetails id={match.params.id} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
