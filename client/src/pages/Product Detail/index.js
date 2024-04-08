import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";

import ImageGallery from "react-image-gallery";

import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { _id } = useParams();

  const basketData = useBasket();

  const addToBasketBtn = () => {
    basketData.addToBasket(data, findBasketItem);
  };

  const { isLoading, error, data } = useQuery(["product", _id], () =>
    fetchProduct(_id)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const images = data.photos.map((url) => ({ original: url }));

  const findBasketItem = basketData.items.find((item) => item._id === _id);

  return (
    <div>
      <Button
        colorScheme={findBasketItem ? "red" : "blue"}
        onClick={addToBasketBtn}
      >
        {findBasketItem ? "Remove from Basket" : "Add to Basket"}
      </Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
      <Text as="h5" fontSize="medium">
        {data.description}
      </Text>
      <Box margin="10">
        <ImageGallery items={images} showThumbnails={false}></ImageGallery>
      </Box>
    </div>
  );
}

export default ProductDetail;
