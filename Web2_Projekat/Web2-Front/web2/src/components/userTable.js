import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { tableColumns } from "../helpers/helpers";

const UserTable = ({ users }) => {
  console.log("**********");
  console.log(users);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {Object.keys(users[0]).map((key, index) => (
            <Th key={index}>{key}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {users.map((user, index) => (
          <Tr key={index}>
            {Object.keys(user).map((key, index) => (
              <Td key={index}>{tableColumns(key, user)}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UserTable;
