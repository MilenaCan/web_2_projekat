import {
  Box,
  Heading,
  Text,
  Input,
  Center,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registration } from "../services/registerApi";

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [userType, setUserType] = useState(0);
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("aaa");
  const [vrerificationStaus, setVerificationStatus] = useState(0);

  const [isFormValid, setIsFormValid] = useState(false);
  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        email.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        name.trim() !== "" &&
        lastname.trim() !== "" &&
        birthDate.trim() !== "" &&
        address.trim() !== ""
    );
    console.log(username);
  };
  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        email.trim() !== "" &&
        username.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        name.trim() !== "" &&
        lastname.trim() !== "" &&
        birthDate.trim() !== "" &&
        address.trim() !== ""
    );
  };
  const handleConfirmPasswordInputChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        email.trim() !== "" &&
        username.trim() !== "" &&
        password.trim() !== "" &&
        name.trim() !== "" &&
        lastname.trim() !== "" &&
        birthDate.trim() !== "" &&
        address.trim() !== ""
    );
  };
  const handleEmailInputChange = (event) => {
    setEmail(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        username.trim() !== "" &&
        name.trim() !== "" &&
        lastname.trim() !== "" &&
        birthDate.trim() !== "" &&
        address.trim() !== ""
    );
  };
  const handleNameInputChange = (event) => {
    setName(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        email.trim() !== "" &&
        username.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        lastname.trim() !== "" &&
        birthDate.trim() !== "" &&
        address.trim() !== ""
    );
  };
  const handleLastnameInputChange = (event) => {
    setLastname(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        email.trim() !== "" &&
        username.trim() !== "" &&
        name.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        birthDate.trim() !== "" &&
        address.trim() !== ""
    );
  };
  const handleBirthDateInputChange = (event) => {
    setBirthDate(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        email.trim() !== "" &&
        username.trim() !== "" &&
        name.trim() !== "" &&
        lastname.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        address.trim() !== ""
    );
  };
  const handleAddressInputChange = (event) => {
    setAddress(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        email.trim() !== "" &&
        username.trim() !== "" &&
        name.trim() !== "" &&
        lastname.trim() !== "" &&
        birthDate.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        password.trim() !== ""
    );
  };
  const handleSubmit = () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
      name.trim() === "" ||
      lastname.trim() === "" ||
      birthDate.trim() === "" ||
      confirmPassword.trim() === "" ||
      address.trim() === ""
    ) {
      alert("Sva polja moraju biti popunjena!");

      return;
    }
    const userData = {
      username,
      email,
      password,
      confirmPassword,
      name,
      lastname,
      birthDate,
      address,
      userType,
      photo,
      vrerificationStaus,
    };
    registration(userData);

    // navigate("/ProfilePage", { state: { userData } });
  };

  return (
    <Box bg="gray.100">
      <Heading p="2rem" textAlign="center" color="gray.800" as="h1">
        OnlineShop
      </Heading>
      <Box pr="4rem" pl="4rem" pb="4rem">
        <Box flexDir="column" borderRadius="12px" shadow="md" bg="white">
          <Text p="1rem" as="h3" color="gray.800" align="center">
            Registracija
          </Text>
          <Center>
            <Box flexDir="column">
              <Box p="0.2rem">
                <Input
                  value={username}
                  onChange={handleUsernameInputChange}
                  bg="white"
                  borderRadius="8px"
                  borderColor="#e4e6c3"
                  placeholder="Korisničko ime"
                />
              </Box>
              <Box p="0.2rem">
                <Input
                  value={email}
                  onChange={handleEmailInputChange}
                  bg="white"
                  borderRadius="8px"
                  borderColor="#e4e6c3"
                  placeholder="Email"
                />
              </Box>
              <Box p="0.2rem">
                <Input
                  value={password}
                  onChange={handlePasswordInputChange}
                  bg="white"
                  borderRadius="8px"
                  borderColor="#e4e6c3"
                  placeholder="Lozinka"
                />
              </Box>
              <Box p="0.2rem">
                <Input
                  value={confirmPassword}
                  onChange={handleConfirmPasswordInputChange}
                  bg="white"
                  borderRadius="8px"
                  borderColor="#e4e6c3"
                  placeholder="Potvdi Lozinku"
                />
              </Box>
              <Box p="0.2rem">
                <Input
                  value={name}
                  onChange={handleNameInputChange}
                  bg="white"
                  borderRadius="8px"
                  borderColor="#e4e6c3"
                  placeholder="Ime"
                />
              </Box>
              <Box p="0.2rem">
                <Input
                  value={lastname}
                  onChange={handleLastnameInputChange}
                  bg="white"
                  borderRadius="8px"
                  borderColor="#e4e6c3"
                  placeholder="Prezime"
                />
              </Box>
              <Box p="0.2rem">
                <Input
                  value={birthDate}
                  onChange={handleBirthDateInputChange}
                  bg="white"
                  borderRadius="8px"
                  borderColor="#e4e6c3"
                  placeholder="Datum rođenja"
                />
                <Box p="0.2rem">
                  <Input
                    value={address}
                    onChange={handleAddressInputChange}
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Adresa"
                  />
                  <Box p="0.2rem">
                    <Select
                      value={userType}
                      bg="white"
                      borderRadius="8px"
                      borderColor="#e4e6c3"
                    >
                      <option value="0">Prodavac</option>
                      <option value="1">Kupac</option>
                    </Select>
                  </Box>
                  <Box p="0.2rem" display="flex">
                    <Text p="0.4rem">Fotografija:</Text>

                    <Button bg="gray.300">Dodaj</Button>
                  </Box>
                  <Box p="0.2rem">
                    <Center>
                      {isFormValid ? (
                        <RouterLink to="/LoginPage">
                          <Button
                            disabled={!isFormValid}
                            onClick={handleSubmit}
                            bg="gray.300"
                          >
                            Registruj se
                          </Button>
                        </RouterLink>
                      ) : (
                        <RouterLink to="/Registration">
                          <Button
                            disabled={!isFormValid}
                            onClick={handleSubmit}
                            bg="gray.300"
                          >
                            Registruj se
                          </Button>
                        </RouterLink>
                      )}
                    </Center>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default Registration;
