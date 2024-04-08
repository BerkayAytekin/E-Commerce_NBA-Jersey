import { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

const BasketProvider = (props) => {
  const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

  const [items, setItems] = useState(defaultBasket);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      return setItems((items) => [data, ...items]);
    } else {
      const filteredItems = items.filter(
        (item) => item._id !== findBasketItem._id
      );
      setItems(filteredItems);
    }
  };

  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const emptyBasket = () => {
    setItems([]);
  };

  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    emptyBasket,
  };

  return (
    <BasketContext.Provider value={values}>
      {props.children}
    </BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { useBasket, BasketProvider };
