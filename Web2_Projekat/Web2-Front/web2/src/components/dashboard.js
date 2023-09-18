import { Box, UnorderedList, ListItem, Button, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../contexts/auth-context";
import { useContext } from "react";

const Dashboard = (props) => {
  const context = useContext(AuthContext);
  const handleLogout = (e) => {
    e.preventDefault();
    context.onLogout();
  };
  return (
    <Box h="100vh" flex={1} display="flex">
      <Box p="1rem" flex={1} bg="white" flexDir="column">
        <Flex>
          <RouterLink to="/Registration">
            <Button
              _hover={{ backgroundColor: "transparent" }}
              bg="transparent"
            >
              Registracija
            </Button>
          </RouterLink>

          <Button
            onClick={handleLogout}
            _hover={{ backgroundColor: "transparent" }}
            bg="transparent"
          >
            Odjavi se
          </Button>
        </Flex>
        <UnorderedList>
          <ListItem>
            <RouterLink to="/ProfilePage">
              <Button
                _hover={{ backgroundColor: "transparent" }}
                bg="transparent"
              >
                Profil
              </Button>
            </RouterLink>
          </ListItem>

          {context.type() === "Administrator" && (
            <>
              <ListItem>
                <RouterLink to="/Verifications">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Verifikacija
                  </Button>
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/AllOrders">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Sve porudžbine
                  </Button>
                </RouterLink>
              </ListItem>
            </>
          )}

          {context.type() === "Seller" && (
            <>
              <ListItem>
                <RouterLink to="/Products">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Dodavanje proizvoda
                  </Button>
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/NewOrders">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Nove porudžbine
                  </Button>
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/MyOrders">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Moje porudžbine
                  </Button>
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/Map">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Mapa
                  </Button>
                </RouterLink>
              </ListItem>
            </>
          )}

          {context.type() === "Buyer" && (
            <>
              <ListItem>
                <RouterLink to="/BuyerNewOrder">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Nova porudžbina
                  </Button>
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/PreviousOrders">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Prethodne porudžbine
                  </Button>
                </RouterLink>
              </ListItem>
            </>
          )}
        </UnorderedList>
      </Box>
      <Box width="80%" bg="white">
        {props.children}
      </Box>
    </Box>
  );
};

export default Dashboard;
