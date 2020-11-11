import React, { createContext } from "react";
import { BoardContextProvider } from "./contexts/BoardContext";
import { GameContextProvider } from "./contexts/GameContext";
import Welcome from "./components/Welcome";
import Life from "./components/Life";
import Rule from "./components/Rule";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/life">
          <BoardContextProvider>
            <GameContextProvider>
              <Life />
            </GameContextProvider>
          </BoardContextProvider>
        </Route>
        <Route path="/rule">
          <Rule />
        </Route>
        <Route path="/">
          <BoardContextProvider>
            <Welcome />
          </BoardContextProvider>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
