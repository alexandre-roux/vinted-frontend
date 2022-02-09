import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./containers/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
      </Routes>
    </Router>
  );
}

export default App;
