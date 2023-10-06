import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import "./RegisterPage.css";

export function RegistrationSuccessful() {
  const navigate = useNavigate();
  return (
    <div className="registration-container">
      <h1 className="successful-registration-header">
        Registration successful!
      </h1>
      <Button autoFocus text="Login" onClick={() => navigate("/login")} />
    </div>
  );
}

export default RegistrationSuccessful;
