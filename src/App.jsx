import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

// Component Imports
import TravelDashboard from "./Pages/Dashboard/TravelDashboard";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import FooterComponent from "./components/FooterComponent";
import SelectService from "./Pages/service/SelectService";
// import NotFoundPage from "./Pages/NotFoundPage";

// Protected Component
function ProtectedRoute({ element }) {
  const isAuthenticated = localStorage.getItem("jwt");
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App sm:w-full">
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<SelectService />} />}
        />

        <Route
          path="/travel"
          element={<ProtectedRoute element={<TravelDashboard />} />}
        />

        {/* <Route path="/*" element={<NotFoundPage />}></Route> */}
      </Routes>

      <FooterComponent />
    </div>
  );
}

export default App;
