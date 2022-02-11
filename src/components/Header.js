import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useState } from "react";

const Header = (props) => {
  const [token, setToken] = useState(Cookies.get("token"));
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);

  const handleSortingOrder = (event) => {
    const value = event.target.value;
    setSortingOrder(value);
  };

  const handleMinPrice = (event) => {
    const value = event.target.value;
    setMinPrice(value);
  };

  const handleMaxPrice = (event) => {
    const value = event.target.value;
    setMaxPrice(value);
  };

  const handleLogoutClick = () => {
    Cookies.remove("token");
    setToken(undefined);
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="https://lereacteur-vinted.netlify.app/static/media/logo.3dcf8b02.png"
          alt="vinted"
        />
      </Link>
      <div className="search-container">
        <FontAwesomeIcon
          className="search-input-icon"
          icon="magnifying-glass"
        />
        <input
          className="search-input"
          type="text"
          placeholder="Recherche des articles"
        />
        {props.displayAdvancedSearch && (
          <div className="advanced-search">
            <span>Trier les prix : </span>
            <select value={sortingOrder} onChange={handleSortingOrder}>
              <option value="asc">Ascendant</option>
              <option value="desc">Descendant</option>
            </select>
            <span> Prix: entre </span>
            <input type="number" value={minPrice} onChange={handleMinPrice} />
            <span> et </span>
            <input type="number" value={maxPrice} onChange={handleMaxPrice} />
          </div>
        )}
      </div>
      <div className="register-login">
        {token ? (
          <button className="red-button" onClick={handleLogoutClick}>
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button className="white-button">S'inscrire</button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="white-button">Se connecter</button>
            </Link>
          </>
        )}
      </div>
      <button className="green-button">Vends tes articles</button>
    </div>
  );
};

export default Header;
