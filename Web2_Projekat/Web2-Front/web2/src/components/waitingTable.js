import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import adminApi from "../services/adminApi";
import { tableColumns } from "../helpers/helpers";

const WaitingTable = ({ users, refresh }) => {
  const verify = (id, status) => {
    adminApi
      .postVerifyUser({ id: id, verificationStatus: status })
      .then((res) => refresh());
  };

  return (
    <Table
      borderRadius="12px"
      shadow="md"
      bg="gray.100"
      p="2rem"
      variant="simple"
      size="sm"
      colorScheme="blue"
    >
      <Thead>
        <Tr>
          {Object.keys(users[0]).map((key, index) => (
            <Th key={index}>{key}</Th>
          ))}
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user, index) => (
          <Tr key={index}>
            {Object.keys(user).map((key, index) => (
              <Td key={index}>{tableColumns(key, user)}</Td>
            ))}
            <Td>
              <Button colorScheme="green" onClick={(e) => verify(user.id, 1)}>
                Confirm
              </Button>
            </Td>
            <Td>
              <Button colorScheme="red" onClick={(e) => verify(user.id, 2)}>
                Reject
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default WaitingTable;
