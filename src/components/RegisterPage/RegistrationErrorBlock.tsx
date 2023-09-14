import Button from "../common/Button/Button";
import "./RegisterPage.css";

interface Props {
  error: string;
  onResetError: () => void;
}

const RegistrationErrorBlock = ({ error, onResetError }: Props) => {
  return (
    <div className="error-block">
      <p className="error">{error}</p>
      <Button autoFocus onClick={onResetError} text="Try Again" type="submit" />
    </div>
  );
};

export default RegistrationErrorBlock;
