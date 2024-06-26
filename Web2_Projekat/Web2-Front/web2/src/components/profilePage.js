import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Image,
  Flex,
} from "@chakra-ui/react";
import Dashboard from "./dashboard";

import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { convertImage } from "../helpers/helpers";
import registerApi from "../services/registerApi";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    newPassword: "",
    email: "",
    fullName: "",
    birthday: "",
    address: "",
    image: "",
    imageFile: "",
  });

  useEffect(() => {
    registerApi.getUser().then((res) => {
      setData({ ...data, ...res, birthday: res.birthday.split("T")[0] });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
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

    if (data.password && data.password.length > 100) {
      validationErrors.password =
        "Korisničko ime ne može biti duže od 100 karatktera";
    }

    if (data.newPassword && data.newPassword.length > 100) {
      validationErrors.newPassword =
        "Nova lozinka ime ne može biti duža od 100 karatktera";
    }

    if (!data.email) {
      validationErrors.email = "Popuniti Email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      validationErrors.email = "Pogrešan email";
    } else if (data.email.length > 100) {
      validationErrors.email = "Email ne može biti duže od 100 karatktera";
    }

    if (!data.fullName) {
      validationErrors.fullName = "Popuniti Ime i Prezime";
    } else if (data.fullName.length > 100) {
      validationErrors.fullName =
        "Ime i Prezime ne može biti duže od 100 karatktera";
    }

    if (!data.birthday) {
      validationErrors.birthday = "Izaberi datum rođenja";
    }

    if (!data.address) {
      validationErrors.address = "Popuniiti adresu";
    } else if (data.address.length > 100) {
      validationErrors.address = "Adresa ne može biti duža od 100 karatktera";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    const formData = new FormData();
    for (const prop in data) {
      formData.append(prop, data[prop]);
    }

    registerApi
      .setUser(formData)
      .then((res) => alert("Successfully changed!"))
      .catch((e) => {
        console.log(e);
        return;
      });
    navigate("/profilePage");
  };

  return (
    <Flex>
      <Dashboard>
        <Box flex={1} bg="white">
          <Center>
            <Box>
              <Heading as="h1">Profilna strana</Heading>
            </Box>
          </Center>

          <form onSubmit={handleSubmit}>
            <Box pl="4rem" pr="4rem" pb="4rem" pt="1rem">
              <Box bg="gray.200" borderRadius="12px" shadow="md">
                <Center>
                  <Box p="2rem" flexDir="column">
                    <Box p="0.2rem">
                      <FormControl>
                        <FormLabel>Korisničko ime:</FormLabel>
                        <Input
                          type="text"
                          name="username"
                          value={data.username}
                          onChange={handleChange}
                        />
                        {errors.username && (
                          <span className={classes.error}>
                            {errors.username}
                          </span>
                        )}
                      </FormControl>
                    </Box>
                    <Box p="0.2rem">
                      <FormControl>
                        <FormLabel>Lozinka:</FormLabel>
                        <Input
                          type="password"
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                        />
                        {errors.password && (
                          <span className={classes.error}>
                            {errors.password}
                          </span>
                        )}
                      </FormControl>
                    </Box>
                    <Box p="0.2rem">
                      <FormControl>
                        <FormLabel>Nova Lozinka:</FormLabel>
                        <Input
                          type="password"
                          name="newPassword"
                          value={data.newPassword}
                          onChange={handleChange}
                        />
                        {errors.newPassword && (
                          <span className={classes.error}>
                            {errors.newPassword}
                          </span>
                        )}
                      </FormControl>
                    </Box>
                    <Box p="0.2rem">
                      <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Input
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <span className={classes.error}>{errors.email}</span>
                        )}
                      </FormControl>
                    </Box>
                    <Box p="0.2rem">
                      <FormControl>
                        <FormLabel>Ime i Prezime:</FormLabel>
                        <Input
                          type="text"
                          name="fullName"
                          value={data.fullName}
                          onChange={handleChange}
                        />
                        {errors.fullName && (
                          <span className={classes.error}>
                            {errors.fullName}
                          </span>
                        )}
                      </FormControl>
                    </Box>
                    <Box p="0.2rem">
                      <FormControl>
                        <FormLabel>Datum Rođenja:</FormLabel>
                        <Input
                          type="date"
                          name="birthday"
                          value={data.birthday}
                          onChange={handleChange}
                          className={classes.input}
                          min="1900-01-01"
                          max={`${new Date().getFullYear() - 18}-01-01`}
                        />
                        {errors.birthday && (
                          <span className={classes.error}>
                            {errors.birthday}
                          </span>
                        )}
                      </FormControl>
                      <Box p="0.2rem">
                        <FormControl>
                          <FormLabel>Adresa:</FormLabel>
                          <Input
                            name="address"
                            value={data.address}
                            onChange={handleChange}
                          />
                          {errors.address && (
                            <span className={classes.error}>
                              {errors.address}
                            </span>
                          )}
                        </FormControl>
                      </Box>
                      <Box p="0.2rem">
                        <Image
                          title="Image"
                          alt="Add"
                          src={
                            data.imageFile
                              ? URL.createObjectURL(data.imageFile)
                              : data.image && convertImage(data.image)
                          }
                          className={classes.image}
                        />
                        <Box p="0.2rem">
                          <Input
                            type="file"
                            name="imageFile"
                            accept="image/jpg"
                            onChange={(e) => {
                              setData({
                                ...data,
                                imageFile: e.target.files[0],
                              });
                            }}
                            className={classes.fileInput}
                          />
                        </Box>

                        <Box p="0.2rem">
                          <Center>
                            <Button type="submit" bg="gray.300">
                              Sačuvaj
                            </Button>
                          </Center>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Center>
              </Box>
            </Box>
          </form>
        </Box>
      </Dashboard>
    </Flex>
  );
};

export default ProfilePage;
