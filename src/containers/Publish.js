import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";

function Publish(props) {
  const token = Cookies.get("token");

  return token ? (
    <>
      <Header />
      <p>Token</p>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Publish;
