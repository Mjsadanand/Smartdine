import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MyRestaurants from "./components/restaurant/MyRestaurants.jsx";
import MenuCreation from "./components/restaurant/MenuCreation.jsx";
import RestaurantMenu from "./components/menu/RestaurantMenu.jsx";
import CookieConsent from "react-cookie-consent";
import Hotel from "./components/Hotel.jsx";
import Dashboard from "./components/analytics/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import OauthSuccess from "./components/auth/OauthSuccess.jsx";

function App() {
  return (
    <Router>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="userConsent"
        style={{ background: "#2B373B", color: "#fff" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        declineButtonStyle={{ color: "#fff", background: "#6c757d", fontSize: "13px" }}
        onAccept={() => {
          console.log("User accepted cookies");
        }}
        onDecline={() => {
          console.log("User declined cookies");
        }}
      >
        This website uses cookies to enhance the user experience. By clicking "Accept", you agree to our use of cookies.
      </CookieConsent>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/restaurant/:username"
          element={
            <ProtectedRoute>
              <MyRestaurants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/:username/menu/:restaurantId"
          element={
            <ProtectedRoute>
              <MenuCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:username"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Public route: menu viewing */}
        <Route path="/menu/:menuId" element={<RestaurantMenu />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/oauth-success" element={<OauthSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;