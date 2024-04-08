import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableCaption,
  Text,
} from "@chakra-ui/react";

import { useQuery } from "react-query";

import { fetchOrders } from "../../../api";

function AdminOrders() {
  const { isLoading, error, data } = useQuery("admin:orders", fetchOrders);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Text fontSize="2xl" p={5}>
        Orders
      </Text>
      <Table variant="simple">
        <TableCaption>Waiting Orders</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th isNumeric>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td isNumeric>{item.items.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default AdminOrders;
