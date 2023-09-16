import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import classes from "./Verification.module.css";
import WaitingTable from "./waitingTable";
import UserTable from "./userTable";
import { Box, Heading } from "@chakra-ui/react";

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
    <Box p="2rem">
      {waitingUsers && waitingUsers.length !== 0 && (
        <>
          <h2 className={classes.heading}>Verifications</h2>
          <WaitingTable users={waitingUsers} refresh={refresh} />
          <br />
        </>
      )}
      {verifiedUsers && verifiedUsers.length !== 0 && (
        <>
          <Heading p="2rem" as="h3">
            Verified users
          </Heading>
          <UserTable users={verifiedUsers} />
        </>
      )}
      {declinedUsers && declinedUsers.length !== 0 && (
        <>
          <Heading p="2rem" as="h3">
            Declined users
          </Heading>
          <UserTable users={declinedUsers} />
        </>
      )}
      {buyers && buyers.length !== 0 && (
        <>
          <Heading p="2rem" as="h3">
            Buyers
          </Heading>
          <UserTable users={buyers} />
        </>
      )}
    </Box>
  );
};

export default Verifications;
