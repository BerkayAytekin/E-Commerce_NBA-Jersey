import React from "react";

import { postNewProduct } from "../../../api";

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

import newProductScheme from "./validations";

function NewProduct() {
  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };
    try {
      await postNewProduct(newValues);
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
      <Text fontSize="2xl">New Product</Text>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: [],
        }}
        validationSchema={newProductScheme}
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
                    Save
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

export default NewProduct;
