import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { RequireAuth } from "./guards/RequireAuth";
import Add from "./pages/cv/add";
import List from "./pages/cv/list";

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
            <List />
          </RequireAuth>
        />
        <Route path="/login" element=<Login /> />
        <Route path="/my-cv" element=<List /> />
        <Route path="/my-cv/add" element=<Add /> />
      </Routes>
    </Router>
  );
}

export default App;
