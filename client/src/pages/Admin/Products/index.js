import { useMemo } from "react";

import { fetchProductList, deleteProduct } from "../../../api";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Popconfirm, Table } from "antd";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function AdminProducts() {
  const { isLoading, error, data } = useQuery(
    "admin:products",
    fetchProductList
  );

  const queryClient = useQueryClient();

  const deletedMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const columns = useMemo(() => {
    return [
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Price", dataIndex: "price", key: "price" },
      { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/adminproducts/${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deletedMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("Success");
                  },
                });
              }}
              onCancel={() => {
                console.log("İptal Edildi");
              }}
              placement="left"
            >
              <a style={{ marginLeft: 10 }}>Delete</a>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  console.log(data);
  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" p="5">
          Products
        </Text>
        <Link to="/admin/newproducts">
          <Button colorScheme="blue">New Product</Button>
        </Link>
      </Flex>

      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  );
}

export default AdminProducts;
