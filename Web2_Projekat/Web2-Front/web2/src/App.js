import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Registration from "./components/registration";
import LoginPage from "./components/login";
import ProfilePage from "./components/profilePage";

function App() {
  return (
    <ChakraProvider>
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Loginpage" element={<LoginPage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/Registration" element={<Registration />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default App;
