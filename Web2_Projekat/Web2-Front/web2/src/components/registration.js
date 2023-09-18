import {
  Box,
  Heading,
  Text,
  Input,
  Center,
  Select,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerApi from "../services/registerApi";
import classes from "./Regster.module.css";
import { Link as RouterLink } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    fullName: "",
    birthday: "",
    address: "",
    type: "",
    imageFile: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!data.username) {
      validationErrors.username = "Popuniti korisničko ime";
    } else if (!/^[a-zA-Z0-9]+$/.test(data.username)) {
      validationErrors.username =
        "Korisničko ime može da sadrži samo alfanumeričke znakove";
    } else if (data.username.length > 100) {
      validationErrors.username =
        "Korisničko ime ne može biti duže od 100 karatktera";
    }

    if (!data.password) {
      validationErrors.password = "Popuniti lozinku";
    } else if (data.password.length > 100) {
      validationErrors.password = "Lozinka ne može biti duža od 100 karatktera";
    }

    if (!data.confirmPassword) {
      validationErrors.confirmPassword = "Potvrdite lozinku";
    } else if (data.confirmPassword !== data.password) {
      validationErrors.confirmPassword = "Lozinke se ne poklapaju";
    }

    if (!data.email) {
      validationErrors.email = "Popuniti Email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      validationErrors.email = "Neispravna Email adresa";
    } else if (data.email.length > 100) {
      validationErrors.email = "Email ne može biti duža od 100 karatktera";
    }

    if (!data.fullName) {
      validationErrors.fullName = "Popuniti Ime i Prezime";
    } else if (data.fullName.length > 100) {
      validationErrors.fullName =
        "Ime i Prezime ne može biti duža od 100 karatktera";
    }

    if (!data.birthday) {
      validationErrors.birthday = "Izaberite datum rođenja";
    }

    if (!data.address) {
      validationErrors.address = "Popuniti Adresu";
    } else if (data.address.length > 200) {
      validationErrors.address = "Adresa ne može biti duža od 100 karatktera";
    }

    if (!data.type) {
      validationErrors.type = "Izaberite tip korisnika";
    }

    setErrors(validationErrors);

    // If there are no validation errors, submit the form
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    const formData = new FormData();
    for (const prop in data) {
      formData.append(prop, data[prop]);
    }

    registerApi
      .register(formData)
      .then((res) => {
        alert("Successfully registered!");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  return (
    <Box bg="gray.100">
      <Heading p="2rem" textAlign="center" color="gray.800" as="h1">
        OnlineShop
      </Heading>
      <Box display="column" pr="4rem" pl="4rem" pb="4rem">
        <Box flexDir="column" borderRadius="12px" shadow="md" bg="white">
          <Text p="1rem" as="h2" color="gray.900" align="center">
            Registracija
          </Text>
          <Center>
            <form onSubmit={handleSubmit}>
              <Box flexDir="column">
                <Box p="0.2rem">
                  <Input
                    type="username"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Korisničko ime"
                  />
                  {errors.username && (
                    <span className={classes.error}>{errors.username}</span>
                  )}
                </Box>
                <Box p="0.2rem">
                  <Input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className={classes.error}>{errors.email}</span>
                  )}
                </Box>
                <Box p="0.2rem">
                  <Input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Lozinka"
                  />
                  {errors.password && (
                    <span className={classes.error}>{errors.password}</span>
                  )}
                </Box>
                <Box p="0.2rem">
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Potvrdite lozinku"
                  />
                  {errors.confirmPassword && (
                    <span className={classes.error}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </Box>

                <Box p="0.2rem">
                  <Input
                    type="fullName"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    bg="white"
                    borderRadius="8px"
                    borderColor="#e4e6c3"
                    placeholder="Ime i Prezime"
                  />
                  {errors.fullName && (
                    <span className={classes.error}>{errors.fullName}</span>
                  )}
                </Box>
                <Box p="0.2rem">
                  <Input
                    type="date"
                    name="birthday"
                    min="1900-01-01"
                    max={`${new Date().getFullYear() - 18}-01-01`}
                    value={data.birthday}
                    onChange={handleChange}
                  />
                  {errors.birthday && (
                    <span className={classes.error}>{errors.birthday}</span>
                  )}
                  <Box p="0.2rem">
                    <Input
                      type="address"
                      name="address"
                      value={data.address}
                      onChange={handleChange}
                      bg="white"
                      borderRadius="8px"
                      borderColor="#e4e6c3"
                      placeholder="Adresa"
                    />
                    {errors.address && (
                      <span className={classes.error}>{errors.address}</span>
                    )}
                    <Box p="0.2rem">
                      <Select
                        name="type"
                        value={data.type}
                        onChange={handleChange}
                        bg="white"
                        borderRadius="8px"
                        borderColor="#e4e6c3"
                      >
                        <option value="">Tip korisnika</option>
                        <option value="1">Prodavac</option>
                        <option value="2">Kuapc</option>
                      </Select>
                      {errors.type && (
                        <span className={classes.error}>{errors.type}</span>
                      )}
                    </Box>
                    <Box p="0.2rem" display="flex">
                      <Image
                        title="Image"
                        width={200}
                        height={100}
                        alt="Add"
                        src={
                          data.imageFile && URL.createObjectURL(data.imageFile)
                        }
                      />

                      <Input
                        type="file"
                        name="imageFile"
                        accept="image/jpg"
                        onChange={(e) => {
                          setData({ ...data, imageFile: e.target.files[0] });
                        }}
                      />
                    </Box>
                    <Center>
                      <Box display="column" p="0.2rem">
                        <Box>
                          <Button
                            type="submit"
                            className={classes.submitButton}
                          >
                            Registracija
                          </Button>
                        </Box>
                      </Box>
                    </Center>
                  </Box>
                </Box>
              </Box>
            </form>
            <Box></Box>
          </Center>
        </Box>
        <Flex>
          <Box p="1rem">Imate nalog?</Box>
          <RouterLink to="/Loginpage">
            <Button type="submit" className={classes.submitButton}>
              Login
            </Button>
          </RouterLink>
        </Flex>
      </Box>
    </Box>
  );
};

export default Registration;
