import React, { createContext, useReducer } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import Error from "./components/Error";
import Logout from "./components/Logout";
import { initialState, reducer } from "./Reducer/userRed";


export const userContext = createContext()

function App() {
  

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>

      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route component={Error} />
        </Switch>
      </userContext.Provider>

    </React.Fragment>
  );
}

export default App;

