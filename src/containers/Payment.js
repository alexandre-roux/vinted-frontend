import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";

function Payment() {
  const token = Cookies.get("token");
  const location = useLocation();

  const { offer } = location?.state;
  const protectionFees = offer.product_price / 10;
  const shippingFees = protectionFees * 2;
  const total = offer.product_price + protectionFees + shippingFees;

  return token ? (
    <>
      <Header />
      <div className="grey-container">
        <div className="payment">
          <div className="summary">
            <div className="title">Résumé de la commande</div>
            <div className="content">
              <ul>
                <li>
                  Commande<span>{offer.product_price} €</span>
                </li>
                <li>
                  Frais protection acheteurs
                  <span>{protectionFees} €</span>
                </li>
                <li>
                  Frais de port<span>{shippingFees} €</span>
                </li>
              </ul>
            </div>
            <div className="divider"></div>
            <div className="content">
              <ul>
                <li className="bold">
                  Total<span>{total} €</span>
                </li>
              </ul>
            </div>
            <div className="content">
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <span className="bold">{offer.product_name}. </span>Vous allez
              payer <span className="bold">{total} €</span> (frais de protection
              et frais de port inclus).
            </div>
            <div className="divider"></div>
            <button className="pay-button" type="submit">
              Payer
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Payment;
