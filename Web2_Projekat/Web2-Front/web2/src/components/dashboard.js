import { Box, UnorderedList, ListItem, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <Box display="flex">
      <Box bg="gray.300" flexDir="column" height="100vh" p="2rem">
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
          <ListItem>
            <Button
              _hover={{ backgroundColor: "transparent" }}
              bg="transparent"
            >
              Dodavanje artikla
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{ backgroundColor: "transparent" }}
              bg="transparent"
            >
              Nova porudžbina
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{ backgroundColor: "transparent" }}
              bg="transparent"
            >
              Prethodne porudžbine
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{ backgroundColor: "transparent" }}
              bg="transparent"
            >
              Verifikacija
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{ backgroundColor: "transparent" }}
              bg="transparent"
            >
              Nove Porudžbine
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{ backgroundColor: "transparent" }}
              bg="transparent"
            >
              Moje porudžbina
            </Button>
          </ListItem>
          <ListItem>
            <Button
              _hover={{ backgroundColor: "transparent" }}
              bg="transparent"
            >
              Sve porudžbine
            </Button>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box bg="gray.100" flex={1}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Dashboard;