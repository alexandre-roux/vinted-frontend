import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = () => {
  const token = Cookies.get("token");
  return (
    <div className="header-container">
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
        </div>
        <div className="register-login">
          {token ? (
            <button className="red-button">Se déconnecter</button>
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
    </div>
  );
};

export default Header;
