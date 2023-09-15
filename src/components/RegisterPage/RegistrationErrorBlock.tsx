import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import "./RegisterPage.css";

interface Props {
  error: string;
  onResetError: () => void;
}

const RegistrationErrorBlock = ({ error, onResetError }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="error-block">
      <p className="error">{error}</p>
      <div className="buttons-container">
        <Button
          autoFocus
          onClick={onResetError}
          text="Try Again"
          type="submit"
          style={{ order: 1 }}
        />
        <Button
          onClick={() => navigate("/")}
          text="Back to Timer"
          type="button"
          style={{ order: 2 }}
        />
      </div>
    </div>
  );
};

export default RegistrationErrorBlock;
