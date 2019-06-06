const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API!"
  });
});

app.get("/private", jwtCheck, function(req, res) {
  res.json({
    message: "Hello from a private API!"
  });
});

function checkRole(role) {
  return function(req, res, next) {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("Insufficient role");
    }
  };
}

app.get("/books", jwtCheck, checkScope(["read:books"]), function(req, res) {
  res.json({
    books: [
      { id: 1, title: "Da Vinci Vode" },
      { id: 2, title: "Angels and Demons" }
    ]
  });
});

app.get("/admin", jwtCheck, checkRole("admin"), function(req, res) {
  res.json({
    message: "Hello from a admin API!"
  });
});

app.listen(3001);
console.log("API Server listening on " + process.env.REACT_APP_API_URL);
