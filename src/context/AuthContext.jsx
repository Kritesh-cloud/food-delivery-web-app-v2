import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();
const AuthContextUpdate = React.createContext();

export const getAuth = () => {
  return useContext(AuthContext);
};

export const setAuth = () => {
  return useContext(AuthContextUpdate);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authSucess, setAuthSucess] = useState(false);
  const [curStausCode, curSetStatusCode] = useState(100);

  function setAuthFormData(formData, isSignUp) {
    const url = isSignUp
      ? "http://localhost:8080/signUp"
      : "http://localhost:8080/signIn";
    axios
      .post(url, formData)
      .then((res) => {
        setAuthSucess(true);
        curSetStatusCode(res.data.code);
        if (!isSignUp) {
          localStorage.setItem("authToken", JSON.stringify(res.data.token));
          setToken(JSON.stringify(res.data.token));
        }
      })
      .catch((err) => {
        curSetStatusCode(err.status);
      });
  }

  return (
    <AuthContext.Provider value={{ authSucess, curStausCode, token }}>
      <AuthContextUpdate.Provider value={setAuthFormData}>
        {children}
      </AuthContextUpdate.Provider>
    </AuthContext.Provider>
  );
};
