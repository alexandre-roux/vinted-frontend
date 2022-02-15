import "./App.css";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Payment from "./containers/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
library.add(faMagnifyingGlass);

function App() {
  const stripePromise = loadStripe(
    "pk_test_51KTQdPIYlMR3XXFB0IhiGGT5TP8Et35fqGGL5cQejkwehbG8TWiZVSseKxixHidYY6kZdvSfjQJhEa37tRhZpdNV00OoK1P2Li"
  );

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
