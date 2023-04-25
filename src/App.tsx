import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import CVList from "./pages/cv";
import Login from "./pages/login";
import { RequireAuth } from "./guards/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element=<RequireAuth>
            <Home />
          </RequireAuth>
        />
        <Route
          path="/my-cv"
          element=<RequireAuth>
            <CVList />
          </RequireAuth>
        />
        <Route path="/login" element=<Login /> />
      </Routes>
    </Router>
  );
}

export default App;
