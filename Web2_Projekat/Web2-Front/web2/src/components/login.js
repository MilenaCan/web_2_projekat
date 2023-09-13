import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../services/axiosConfig";

const LoginPage = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        password.trim() !== "" &&
        email.trim() !== ""
    );
    console.log(username);
  };
  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        username.trim() !== "" &&
        email.trim() !== ""
    );
  };
  const handleEmailInputChange = (event) => {
    setEmail(event.target.value);
    setIsFormValid(
      event.target.value.trim() !== "" &&
        password.trim() !== "" &&
        username.trim() !== ""
    );
  };

  const handleSubmit = async () => {
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      alert("Sva polja moraju biti popunjena!");
      console.log("greskaaaa");

      return;
    }
  };

  return (
    <Box>
      <Box gap="1rem" display="flex" p="1rem" ml="820px">
        <Text p="0.5rem">Niste registrovani?</Text>
        <RouterLink to="/Registration">
          <Button bg="gray.300">Registruj se </Button>
        </RouterLink>
      </Box>
      <Box p="8rem">
        <Box p="4rem" borderRadius="12px" shadow="md" bg="gray.100">
          <Center>
            <Box flexDir="column">
              <Heading textAlign="center" color="gray.800" as="h1">
                OnlineShop
              </Heading>
              <Box p="1rem">
                <Box p="0.2rem">
                  <Input
                    value={username}
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Username"
                    onChange={handleUsernameInputChange}
                  />
                </Box>
                <Box p="0.2rem">
                  <Input
                    value={email}
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Email"
                    onChange={handleEmailInputChange}
                  />
                </Box>
                <Box p="0.2rem">
                  <InputGroup size="md">
                    <Input
                      value={password}
                      bg="white"
                      borderRadius="8px"
                      borderColor="#e4e6c3"
                      placeholder="Password"
                      onChange={handlePasswordInputChange}
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        bg="gray.300"
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                      >
                        {show ? "Sakrij" : "Prikaži"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Box>
              <Center>
                <Box p="0.2rem">
                  {isFormValid ? (
                    <RouterLink to="/ProfilePage">
                      <Button
                        bg="gray.300"
                        textColor="gray.800"
                        borderColor="#e4e6c3"
                        borderRadius="8px"
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                      >
                        {console.log(isFormValid)}
                        Prijavi se
                      </Button>
                    </RouterLink>
                  ) : (
                    <RouterLink to="/LoginPage">
                      <Button
                        bg="gray.300"
                        textColor="gray.800"
                        borderColor="#e4e6c3"
                        borderRadius="8px"
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                      >
                        {console.log(isFormValid)}
                        Prijavi se
                      </Button>
                    </RouterLink>
                  )}
                </Box>
              </Center>
            </Box>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
