import React, { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";

function Publish() {
  const token = Cookies.get("token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrand(value);
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSize(value);
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleConditionChange = (event) => {
    const value = event.target.value;
    setCondition(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleExchangeChange = (event) => {
    const value = event.target.checked;
    setExchange(value);
  };

  return token ? (
    <>
      <Header />
      <div className="grey-container">
        <div className="publish">
          <h2>Vends ton article</h2>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex: Chemise Sézane vert"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="text-input">
              <h4>Décris ton article</h4>
              <textarea
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Zara"
                value={brand}
                onChange={handleBrandChange}
              />
            </div>
            <div className="text-input">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={handleSizeChange}
              />
            </div>
            <div className="text-input">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex: Fushia"
                value={color}
                onChange={handleColorChange}
              />
            </div>
            <div className="text-input">
              <h4>Etat</h4>
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={handleConditionChange}
              />
            </div>
            <div className="text-input">
              <h4>Lieu</h4>
              <input name="city" id="city" placeholder="ex: Paris" />
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Prix</h4>
              <div className="checkbox-section">
                <input
                  type="number"
                  placeholder="0,00 €"
                  value={price}
                  onChange={handlePriceChange}
                />
                <div>
                  <input
                    className="exchange-checkbox"
                    type="checkbox"
                    value={exchange}
                    onChange={handleExchangeChange}
                  />
                  <span> Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Publish;
