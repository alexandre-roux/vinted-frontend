import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://vinted-test.herokuapp.com/offer/" + id
        // "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
      );
      setOffer(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    !isLoading && (
      <>
        <Header />
        <div className="grey-container">
          <div className="offer-page">
            <img
              className="offer-page-image"
              src={offer.product_image.url}
              alt="product"
            />
            <div className="offer-page-details">
              <span className="offer-page-price">{offer.product_price} €</span>
              <ul className="offer-page-details-list">
                {offer.product_details.map((detail, index) => {
                  return (
                    <li key={index}>
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
                  src={offer.owner.account.avatar?.url}
                  alt="seller"
                />
                <span className="offer-page-seller-name">
                  {offer.owner.account.username}
                </span>
              </div>
              <Link to="/payment" state={{ offer: offer }}>
                <button className="offer-page-button">Acheter</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Offer;
