import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useState } from "react";

const Header = (props) => {
  const [token, setToken] = useState(Cookies.get("token"));

  const handleSortingOrder = (event) => {
    const value = event.target.value;
    props.setSortingOrder(value);
  };

  const handleMinPrice = (event) => {
    const value = event.target.value;
    props.setMinPrice(value);
  };

  const handleMaxPrice = (event) => {
    const value = event.target.value;
    props.setMaxPrice(value);
  };

  const handleLogoutClick = () => {
    Cookies.remove("token");
    props.setToken(null);
  };

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    props.setSearchTerm(value);
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
          value={props.searchTerm}
          onChange={handleSearchTermChange}
        />
        {props.sortingOrder && (
          <div className="advanced-search">
            <span>Trier les prix : </span>
            <select value={props.sortingOrder} onChange={handleSortingOrder}>
              <option value="price-asc">Ascendant</option>
              <option value="price-desc">Descendant</option>
            </select>
            <span> Prix: entre </span>
            <input
              type="number"
              value={props.minPrice}
              onChange={handleMinPrice}
            />
            <span> et </span>
            <input
              type="number"
              value={props.maxPrice}
              onChange={handleMaxPrice}
            />
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
      <Link to="/publish">
        <button className="green-button">Vends tes articles</button>
      </Link>
    </div>
  );
};

export default Header;
