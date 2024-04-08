import React from "react";

import { useAuth } from "../../contexts/AuthContext";
import { Button, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

function Profile() {
  const profileData = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    profileData.logout();
    navigate("/");
  };

  console.log(profileData.loggedIn);
  return (
    <div>
      <Text fontSize="22">Profile</Text>
      <code>{JSON.stringify(profileData.user)}</code>

      <br></br>
      <br></br>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Profile;
