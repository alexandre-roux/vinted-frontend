import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNewsletterChange = (event) => {
    const value = event.target.checked;
    setNewsletter(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      username: username,
      password: password,
      newsletter: newsletter,
    };
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/signup",
      data
    );
    const token = response.data.token;
    Cookies.set("token", token, { sameSite: "none", secure: true });
  };

  return (
    <>
      <Header />
      <div className="signup-login-container">
        <div className="signup-login">
          <h2>S'inscrire</h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nom d'utilisateur"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="checkbox-container">
              <div>
                <input
                  type="checkbox"
                  value={newsletter}
                  onChange={handleNewsletterChange}
                />
                <span>S'inscrire à notre newsletter</span>
              </div>
              <p>
                En m'inscrivant je confirme avoir lu et accepté les Termes &amp;
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </div>
            <button type="submit">S'inscrire</button>
          </form>
          <a href="/login">Tu as déjà un compte ? Connecte-toi !</a>
        </div>
      </div>
    </>
  );
};

export default Signup;
