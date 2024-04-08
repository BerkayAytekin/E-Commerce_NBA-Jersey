import React from "react";

import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useBasket } from "../../contexts/BasketContext";

function Card(props) {
  const basketData = useBasket();

  const findBasketItem = basketData.items.find(
    (basket_item) => basket_item._id === props.item._id
  );

  const addToBasketBtn = () => {
    basketData.addToBasket(props.item, findBasketItem);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      <Link to={`/product/${props.item._id}`}>
        <Image src={props.item.photos[0]} alt={props.item.title}></Image>
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {moment(props.item.createdAt).format("DD/MM/YYYY")}
          </Box>
          <Box marginTop="1px" fontWeight="semibold" as="h4" lineHeight="tight">
            {props.item.title}
          </Box>
          <Box>{props.item.price}</Box>
        </Box>
      </Link>
      <Button
        colorScheme={findBasketItem ? "red" : "blue"}
        onClick={addToBasketBtn}
      >
        {findBasketItem ? "Remove from Basket" : "Add to Basket"}
      </Button>
    </Box>
  );
}

export default Card;
