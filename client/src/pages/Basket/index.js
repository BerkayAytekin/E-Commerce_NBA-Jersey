import { useRef, useState } from "react";

import { useBasket } from "../../contexts/BasketContext";
import {
  Alert,
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Grid,
  Card,
  Stack,
  CardBody,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";

function Basket() {
  const basketData = useBasket();

  const totalPrice = basketData.items.reduce((acc, obj) => acc + obj.price, 0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const [address, setAddress] = useState("");

  const addressInfo = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmitForm = async () => {
    const itemIds = basketData.items.map((item) => item._id);

    const inputValues = {
      address,
      items: JSON.stringify(itemIds),
    };

    const response = await postOrder(inputValues);
    console.log(response);

    basketData.emptyBasket();
    onClose();
  };

  return (
    <div>
      {basketData.items.length < 1 && (
        <Alert status="warning">There are no products in your basket.</Alert>
      )}
      {basketData.items.length > 0 && (
        <div>
          <Grid templateColumns="repeat(auto-fit, minmax(500px, 1fr))" gap={10}>
            {basketData.items.map((item) => (
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                border="1px"
                borderRadius="10px"
                p="3"
                backgroundColor="rgba(177, 242, 232, 0.5)"
              >
                <Box>
                  <Box>
                    <Link to={`/product/${item._id}`}>
                      <Flex>
                        <Image
                          objectFit="cover"
                          maxW={{ base: "100%", sm: "200px" }}
                          src={item.photos[0]}
                          alt={item.title}
                          borderRadius="7"
                        ></Image>
                        <Stack>
                          <CardBody>
                            <Heading size="md">{item.title}</Heading>
                            <Text>{item.description}</Text>
                          </CardBody>
                        </Stack>
                      </Flex>
                    </Link>
                  </Box>
                  <Flex alignItems="center" justifyContent="right" gap={10}>
                    <Text
                      fontSize="2xl"
                      borderRadius="10px"
                      width={75}
                      textAlign="center"
                      backgroundColor="rgba(168, 199, 247, 0.5)"
                    >
                      {item.price} $
                    </Text>
                    <Button
                      mt="2"
                      size="sm"
                      colorScheme="red"
                      onClick={() => basketData.removeFromBasket(item._id)}
                    >
                      Remove from Basket
                    </Button>
                  </Flex>
                </Box>
              </Card>
            ))}
          </Grid>
          <Box
            border="1px"
            borderRadius="10px"
            p="3"
            backgroundColor="rgba(66, 235, 77, 0.5)"
            maxW="300"
            mt="10"
          >
            <Box>
              <Text fontSize="22">Total Price: {totalPrice} $</Text>
            </Box>
            <Button mt="2" size="sm" colorScheme="yellow" onClick={onOpen}>
              Order
            </Button>
          </Box>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address..."
                    onChange={addressInfo}
                    value={address}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Basket;
