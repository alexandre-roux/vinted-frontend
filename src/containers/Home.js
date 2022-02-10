import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Offer from "../components/Offer";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    !isLoading && (
      <>
        <Header />
        <img
          className="hero-image"
          src="https://lereacteur-vinted.netlify.app/static/media/hero.09bfd0f9.jpg"
          alt="hero"
        />
        <div className="offers-container">
          <div className="offers">
            {data.offers.map((offer, index) => {
              return <Offer key={index} offer={offer} />;
            })}
          </div>
        </div>
      </>
    )
  );
};

export default Home;
