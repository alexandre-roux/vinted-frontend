import React, { useCallback, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useDropzone } from "react-dropzone";

function Publish() {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);
  const [file, setFile] = useState();

  //TODO display image in container
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg,image/png",
    onDrop,
  });

  const handleChange = (event) => {
    switch (event.target.id) {
      case "title":
        setTitle(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      case "brand":
        setBrand(event.target.value);
        break;
      case "size":
        setSize(event.target.value);
        break;
      case "color":
        setColor(event.target.value);
        break;
      case "condition":
        setCondition(event.target.value);
        break;
      case "city":
        setCity(event.target.value);
        break;
      case "price":
        setPrice(event.target.value);
        break;
      case "exchange":
        setExchange(event.target.value);
        break;
      default:
        console.log("Error: " + event.target.id + " isn't a valid id");
        break;
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("picture", file);

      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        "https://vinted-test.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/offer/" + response.data._id);
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };

  return token ? (
    <>
      <Header />
      <div className="grey-container">
        <div className="publish">
          <h2>Vends ton article</h2>
          <div className="file-select">
            <div className="dashed-container">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button>+ Ajoute une photo</button>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="text-input-section">
              <div className="text-input">
                <h4>Titre</h4>
                <input
                  id="title"
                  type="text"
                  placeholder="ex: Chemise Sézane vert"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="text-input">
                <h4>Décris ton article</h4>
                <textarea
                  id="description"
                  rows="5"
                  placeholder="ex: porté quelquefois, taille correctement"
                  value={description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="text-input-section">
              <div className="text-input">
                <h4>Marque</h4>
                <input
                  id="brand"
                  type="text"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={handleChange}
                />
              </div>
              <div className="text-input">
                <h4>Taille</h4>
                <input
                  id="size"
                  type="text"
                  placeholder="ex: L / 40 / 12"
                  value={size}
                  onChange={handleChange}
                />
              </div>
              <div className="text-input">
                <h4>Couleur</h4>
                <input
                  id="color"
                  type="text"
                  placeholder="ex: Fushia"
                  value={color}
                  onChange={handleChange}
                />
              </div>
              <div className="text-input">
                <h4>Etat</h4>
                <input
                  id="condition"
                  type="text"
                  placeholder="ex: Neuf avec étiquette"
                  value={condition}
                  onChange={handleChange}
                />
              </div>
              <div className="text-input">
                <h4>Lieu</h4>
                <input
                  id="city"
                  type="text"
                  placeholder="ex: Paris"
                  value={city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-input-section">
              <div className="text-input">
                <h4>Prix</h4>
                <div className="checkbox-section">
                  <input
                    id="price"
                    type="number"
                    placeholder="0,00 €"
                    value={price}
                    onChange={handleChange}
                  />
                  <div>
                    <input
                      id="exchange"
                      className="exchange-checkbox"
                      type="checkbox"
                      value={exchange}
                      onChange={handleChange}
                    />
                    <span> Je suis intéressé(e) par les échanges</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Publish;
