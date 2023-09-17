import { Box, UnorderedList, ListItem, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../contexts/auth-context";
import { useContext } from "react";

const Dashboard = (props) => {
  const context = useContext(AuthContext);
  return (
    <Box flex={1} display="flex">
      <Box flex={1} bg="gray.300" flexDir="column" p="2rem">
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
                    Proizvodi
                  </Button>
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/NewOrders">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Nove porudzbine
                  </Button>
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/MyOrders">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Moje porudzbine
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
                    Nove porudzbine
                  </Button>
                </RouterLink>
              </ListItem>
              <ListItem>
                <RouterLink to="/PreviousOrders">
                  <Button
                    _hover={{ backgroundColor: "transparent" }}
                    bg="transparent"
                  >
                    Prethodne porudzbine
                  </Button>
                </RouterLink>
              </ListItem>
            </>
          )}
        </UnorderedList>
      </Box>
      <Box bg="gray.100">{props.children}</Box>
    </Box>
  );
};

export default Dashboard;
