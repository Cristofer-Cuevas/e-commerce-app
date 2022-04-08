import pool from "../db/connection.js";
const userAuthControllers = {};

import fetch, { Headers } from "node-fetch";

const postAuthRequest = async (url, body, res) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const { success, token, userExists, isPasswordValid, anInternalErrorOccurred } = await response.json();

  // console.log(success, token, userExists, isPasswordValid, anInternalErrorOccurred);

  if (success) {
    res.json({ success: success, token: token });
  } else if (isPasswordValid === false) {
    res.json({ isPasswordInvalid: isPasswordValid });
  } else if (userExists === false) {
    // When posting sign in if the user doesn't exist server returns false
    res.json({ userExists: userExists });
  } else if (userExists === true) {
    // When posting sign up form if the user exists returns true
    res.json({ userExists: userExists });
  } else if (anInternalErrorOccurred) {
    res.json({ anInternalErrorOccurred: anInternalErrorOccurred });
  }
};

userAuthControllers.signin = async (req, res) => {
  const { email, password } = req.body;
  const url = "https://user-auth-restful-api.herokuapp.com/email-signin";
  const body = JSON.stringify({
    email,
    password,
  });

  postAuthRequest(url, body, res);
};

userAuthControllers.signup = (req, res) => {
  const { name, lastName, email, password } = req.body;
  const url = "https://user-auth-restful-api.herokuapp.com/email-signup";
  const body = JSON.stringify({
    name,
    lastName,
    email,
    password,
  });

  postAuthRequest(url, body, res);
};

userAuthControllers.successRedirect = async (req, res) => {
  const { authorization: token } = req.headers;
  const response = await fetch("https://user-auth-restful-api.herokuapp.com/protected", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    }),
  });
  const { success, user, unauthorized } = await response.json();

  if (success) {
    res.json({ success, user });
  } else {
    res.json({ success, unauthorized });
  }
};

export default userAuthControllers;
