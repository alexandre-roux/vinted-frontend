import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Offer from "../components/Offer";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sortingOrder, setSortingOrder] = useState("price-asc");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers",
        {
          params: {
            sort: sortingOrder,
            priceMin: Number(minPrice),
            priceMax: Number(maxPrice),
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [sortingOrder, minPrice, maxPrice]);

  return (
    !isLoading && (
      <>
        <Header
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrce={setMaxPrice}
        />
        <div className="hero-image">
          <img
            src="https://lereacteur-vinted.netlify.app/static/media/tear.42d6cec6.svg"
            alt="hero tear"
            className="hero-tear"
          />
          <div className="hero-text">
            Prêts à faire du tri dans vos placards ?
            <Link to="/login">
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
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
