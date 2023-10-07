import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../common/Loader/Loader";

export const LogoutPage = () => {
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    saveToken(null);
    navigate("/");
  });

  return <Loader />;
};

export default LogoutPage;
