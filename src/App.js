import React, { Component } from "react";
import { Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  return (
    <>
      <Nav />
      <div class="body">
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
      </div>
    </>
  );
}

export default App;
