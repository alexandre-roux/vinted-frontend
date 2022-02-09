import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
    );
    setOffer(response.data);
    setIsLoading(false);
    console.log(offer);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    !isLoading && (
      <>
        <Header />
        <div className="offer-page-container">
          <div className="offer-page">
            <img
              className="offer-page-image"
              src={offer.product_image.url}
              alt="product image"
            />
            <div className="offer-page-details">
              <span className="offer-page-price">{offer.product_price} €</span>
              <ul className="offer-page-details-list">
                {offer.product_details.map((detail, index) => {
                  return (
                    <li>
                      <span>{Object.keys(detail)[0]}</span>
                      <span>{Object.values(detail)[0]}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="divider" />
              <p className="offer-page-name">{offer.product_name}</p>
              <p className="offer-page-description">
                {offer.product_description}
              </p>
              <div className="offer-page-seller-details">
                <img
                  className="offer-page-seller-image"
                  src={offer.owner.account.avatar.url}
                  alt="seller image"
                />
                <span className="offer-page-seller-name">
                  {offer.owner.account.username}
                </span>
              </div>
              <button className="offer-page-button">Acheter</button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Offer;
