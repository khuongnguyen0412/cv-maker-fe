import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { RequireAuth } from "./guards/RequireAuth";
import Add from "./pages/cv/add";
import List from "./pages/cv/list";
import Edit from "./pages/cv/edit";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element=<MainLayout />>
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
          <Route
            path="/my-cv"
            element=<RequireAuth>
              <List />
            </RequireAuth>
          />
          <Route
            path="/my-cv/add"
            element=<RequireAuth>
              <Add />
            </RequireAuth>
          />
          <Route
            path="/my-cv/edit/:id"
            element=<RequireAuth>
              <Edit />
            </RequireAuth>
          />
        </Route>
        <Route path="/login" element=<Login /> />
      </Routes>
    </Router>
  );
}

export default App;
