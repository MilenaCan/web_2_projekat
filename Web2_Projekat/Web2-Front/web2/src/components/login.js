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
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../contexts/auth-context";
import classes from "./Login.module.css";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const context = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      alert("All fields required.");
      return;
    }

    await context.onLogin(loginForm);
  };

  const handleGoogleSignIn = async (e) => {
    await context.googleLogin(e);
  };

  return (
    <Box>
      <Box gap="1rem" display="flex" p="1rem" ml="820px">
        <Text p="0.5rem">Niste registrovani?</Text>
        <RouterLink to="/Registration">
          <Button bg="gray.300">Registruj se </Button>
        </RouterLink>
      </Box>
      <Heading textAlign="center" color="gray.800" as="h1">
        OnlineShop
      </Heading>
      <Box pl="14rem" pr="14rem" pt="2rem" pb="2rem">
        <Box borderRadius="12px" shadow="md" bg="gray.100">
          <Center>
            <Box flexDir="column">
              <form>
                <Box p="1rem">
                  <Box p="0.2rem">
                    <Input
                      type="email"
                      id="email"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      required
                      placeholder="Username"
                    />
                  </Box>

                  <Box p="0.2rem">
                    <InputGroup size="md">
                      <Input
                        type="password"
                        id="password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        required
                        placeholder="Password"
                      />
                    </InputGroup>
                  </Box>
                  <Box p="0.2rem">
                    <Button type="submit" className={classes.submitButton}>
                      Login
                    </Button>
                  </Box>
                </Box>
              </form>
              <Center>
                <Box pb="2rem">
                  <GoogleLogin
                    onSuccess={handleGoogleSignIn}
                    onError={(e) => alert("Invalid google email.")}
                  />
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
