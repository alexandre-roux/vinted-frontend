import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

function Payment() {
  const token = Cookies.get("token");
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const { offer } = location.state;
  const protectionFees = offer.product_price / 10;
  const shippingFees = protectionFees * 2;
  const total = offer.product_price + protectionFees + shippingFees;

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: offer.owner._id,
    });
    console.log(stripeResponse);

    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    // const response = await axios.post("http://localhost:3000/pay", {
    const response = await axios.post("https://vinted-test.herokuapp.com/pay", {
      stripeToken: stripeToken,
      amount: total,
      description: offer.product_name,
    });
    console.log(response.data);

    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

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
          </div>
          <div className="summary">
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
            {!completed ? (
              <form onSubmit={handleSubmit}>
                <CardElement className="stripe-element" />
                <button className="pay-button" type="submit">
                  Payer
                </button>
              </form>
            ) : (
              <p className="payment-complete">Paiement effectué !</p>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Payment;
