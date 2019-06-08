import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

class Home extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {auth => (
          <div>
            <h1>Home</h1>
            {auth.isAuthenticated() ? (
              <Link to="/profile">View Profile</Link>
            ) : (
              <button onClick={auth.login}>Login</button>
            )}
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Home;
