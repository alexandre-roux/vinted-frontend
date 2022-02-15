import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        // "https://vinted-test.herokuapp.com/user/login",
        data
      );

      const token = response.data.token;
      Cookies.set("token", token, { sameSite: "none", secure: true });

      navigate("/");
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="signup-login-container">
        <div className="signup-login">
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Adresse email"
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
            <button type="submit">Se connecter</button>
          </form>
          <a href="/signup">Pas encore de compte ? Inscris-toi !</a>
        </div>
      </div>
    </>
  );
};

export default Login;
