import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import WaitingTable from "./waitingTable";
import UserTable from "./userTable";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Dashboard from "./dashboard";

const Verifications = () => {
  const [waitingUsers, setWaitingUsers] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [declinedUsers, setDeclinedUsers] = useState([]);
  const [buyers, setBuyers] = useState([]);

  const refresh = () => {
    adminApi.getWaitingUsers().then((res) => {
      setWaitingUsers(res);
    });

    adminApi.getVerifiedUsers().then((res) => {
      setVerifiedUsers(res);
    });

    adminApi.getDeclinedUsers().then((res) => {
      setDeclinedUsers(res);
    });

    adminApi.getBuyers().then((res) => {
      setBuyers(res);
    });
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <Flex h="100%">
      <Dashboard>
        <Box p="2rem">
          {waitingUsers && waitingUsers.length !== 0 && (
            <>
              <Heading p="2rem" as="h3">
                Verifikacije
              </Heading>
              <WaitingTable users={waitingUsers} refresh={refresh} />
              <br />
            </>
          )}
          {verifiedUsers && verifiedUsers.length !== 0 && (
            <>
              <Heading p="2rem" as="h3">
                Verifikovani korisnici
              </Heading>
              <UserTable users={verifiedUsers} />
            </>
          )}
          {declinedUsers && declinedUsers.length !== 0 && (
            <>
              <Heading p="2rem" as="h3">
                Odbijeni korisnici
              </Heading>
              <UserTable users={declinedUsers} />
            </>
          )}
          {buyers && buyers.length !== 0 && (
            <>
              <Heading p="2rem" as="h3">
                Kupci
              </Heading>
              <UserTable users={buyers} />
            </>
          )}
        </Box>
      </Dashboard>
    </Flex>
  );
};

export default Verifications;
