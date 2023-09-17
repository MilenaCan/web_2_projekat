import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Registration from "./components/registration";
import LoginPage from "./components/login";
import ProfilePage from "./components/profilePage";
import { AuthContextProvider } from "./contexts/auth-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CartContextProvider } from "./contexts/cart-context";
import UserTable from "./components/userTable";
import WaitingTable from "./components/waitingTable";
import Verifications from "./components/verification";
import AllOrders from "./components/allOrders";
import Map from "./components/map";
import NewOrders from "./components/newOrders";
import MyOrders from "./components/myOrders";
import Products from "./components/products";
import BuyerNewOrder from "./components/buyerNewOrder";
import PreviousOrders from "./components/previousOrders";
import { Payment } from "@mui/icons-material";
import Paypal from "./components/paypal";

function App() {
  return (
    <ChakraProvider>
      <React.StrictMode>
        <Router>
          <GoogleOAuthProvider
            clientId={
              "553762030277-g4405g2rj6kbug1bkpb2kd6fdpg5hmlh.apps.googleusercontent.com"
            }
          >
            <CartContextProvider>
              <AuthContextProvider>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/Loginpage" element={<LoginPage />} />
                  <Route path="/ProfilePage" element={<ProfilePage />} />
                  <Route path="/Registration" element={<Registration />} />
                  <Route path="/UserTable" element={<UserTable />} />
                  <Route path="/WaitingTable" element={<WaitingTable />} />
                  <Route path="/Verifications" element={<Verifications />} />
                  <Route path="/AllOrders" element={<AllOrders />} />
                  <Route path="/Map" element={<Map />} />
                  <Route path="/NewOrders" element={<NewOrders />} />
                  <Route path="/MyOrders" element={<MyOrders />} />
                  <Route path="/Products" element={<Products />} />
                  <Route path="/BuyerNewOrder" element={<BuyerNewOrder />} />
                  <Route path="/PreviousOrders" element={<PreviousOrders />} />
                  <Route path="/Payment" element={<Payment />} />
                  <Route path="/PayPal" element={<Paypal />} />
                </Routes>
              </AuthContextProvider>
            </CartContextProvider>
          </GoogleOAuthProvider>
        </Router>
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default App;
