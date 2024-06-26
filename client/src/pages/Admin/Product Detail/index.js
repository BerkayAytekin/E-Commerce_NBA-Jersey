import React from "react";
import { useParams } from "react-router-dom";

import { fetchProduct, updateProduct } from "../../../api";

import { useQuery } from "react-query";

import { FieldArray, Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { message } from "antd";

import editScheme from "./validations";

function AdminProductDetail() {
  const { product_id } = useParams();

  const { isLoading, error, data } = useQuery(
    ["admin:products", product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });
    try {
      await updateProduct(values, product_id);
      message.success({
        content: "The product successfully updated",
        key: "product_update",
        duration: 2,
      });
    } catch (e) {
      message.error("Product information could not be updated.");
    }
  };

  return (
    <div>
      <Text fontSize="2xl">Edit</Text>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={editScheme}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          touched,
          errors,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel> Title </FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                  </FormControl>
                  <FormControl mt={"4"}>
                    <FormLabel> Description </FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                  </FormControl>
                  <FormControl mt={"4"}>
                    <FormLabel> Price </FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                  </FormControl>
                  <FormControl mt={"4"}>
                    <FormLabel> Photos </FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index} style={{ display: "flex" }}>
                                <Textarea
                                  name={`photos.${index}`}
                                  value={photo}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  mt="3"
                                />
                                <Button
                                  ml={"4"}
                                  mt="3"
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          <Button
                            mt={"5"}
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add a photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>
                  <Button
                    mt="4"
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default AdminProductDetail;
