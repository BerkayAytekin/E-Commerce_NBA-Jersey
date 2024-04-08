import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";

import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const authData = useAuth();

  const basketData = useBasket();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">NBA Jerseys</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Jerseys</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!authData.loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="purple">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="purple" ml={3}>
                Register
              </Button>
            </Link>
          </>
        )}
        {authData.loggedIn && (
          <>
            {basketData.items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="orange">
                  Basket({basketData.items.length})
                </Button>
              </Link>
            )}
            {authData.user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="pink">Admin</Button>
              </Link>
            )}
            <Link to="/profile">
              <Button colorScheme="green" ml={1}>
                Profile
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
