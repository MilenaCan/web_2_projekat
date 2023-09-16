import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Registration from "./components/registration";
import LoginPage from "./components/login";
import ProfilePage from "./components/profilePage";
import { AuthContextProvider } from "./contexts/auth-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserTable from "./components/userTable";
import WaitingTable from "./components/waitingTable";
import Verifications from "./components/verification";
import AllOrders from "./components/allOrders";

function App() {
  return (
    <ChakraProvider>
      <React.StrictMode>
        <Router>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
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
              </Routes>
            </AuthContextProvider>
          </GoogleOAuthProvider>
        </Router>
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default App;
