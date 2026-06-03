import React, { useEffect } from "react";
import { logout } from "../../service/userServices";
import setAuthToken from "../../utils/setAuthToken";

const Logout = ({ setUser }) => {
  useEffect(() => {
    logout();
    setAuthToken(null);
    setUser(null);
    window.location = "/";
  }, [setUser]);

  return null;
};

export default Logout;
