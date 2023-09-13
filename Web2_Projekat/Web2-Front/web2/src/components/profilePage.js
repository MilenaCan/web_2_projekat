import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import Dashboard from "./dashboard";
import {
  useLocation,
  Link,
  Outlet,
  useParams,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";

const ProfilePage = () => {
  const location = useLocation();
  const userDataFromRegistration = location.state?.userData;
  const [userData, setUserData] = useState(
    userDataFromRegistration || {
      username: "",
      email: "",
      password: "",
      name: "",
      lastname: "",
      birthDate: "",
      address: "",
      userType: "kupac",
    }
  );
  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Dashboard>
      <Box bg="white">
        <Center>
          <Box>
            <Heading as="h1">Profil page</Heading>
          </Box>
        </Center>
        <Box>
          <Button ml="60rem">Odjavi se</Button>
        </Box>
        <Box pl="4rem" pr="4rem" pb="4rem" pt="1rem">
          <Box bg="gray.100" borderRadius="12px" shadow="md">
            <Center>
              <Box flexDir="column">
                <Box p="0.2rem">
                  <Input
                    bg="white"
                    borderRadius="8px"
                    value={userData.username}
                    placeholder={userData.username}
                    borderColor="#e4e6c3"
                    //placeholder="Korisničko ime"
                  />
                </Box>
                <Box p="0.2rem">
                  <Input
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Email"
                  />
                </Box>
                <Box p="0.2rem">
                  <Input
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Lozinka"
                  />
                </Box>
                <Box p="0.2rem">
                  <Input
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Ime"
                  />
                </Box>
                <Box p="0.2rem">
                  <Input
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Prezime"
                  />
                </Box>
                <Box p="0.2rem">
                  <Input
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Datum rođenja"
                  />
                  <Box p="0.2rem">
                    <Input
                      bg="white"
                      borderRadius="8px"
                      borderColor="#e4e6c3"
                      placeholder="Adresa"
                    />
                    <Box p="0.2rem">
                      <Select
                        bg="white"
                        borderRadius="8px"
                        borderColor="#e4e6c3"
                      >
                        <option value="prodavac">Prodavac</option>
                        <option value="kupac">Kupac</option>
                      </Select>
                    </Box>
                    <Box p="0.2rem" display="flex">
                      <Text p="0.4rem">Fotografija:</Text>

                      <Button bg="gray.300">Dodaj</Button>
                    </Box>
                    <Box p="0.2rem">
                      <Center>
                        <Button bg="gray.300">Registruj se</Button>
                      </Center>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Center>
          </Box>
        </Box>
      </Box>
    </Dashboard>
  );
};

export default ProfilePage;
