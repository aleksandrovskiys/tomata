import Button, { ButtonProps } from "../Button/Button";

function AuthFormButton(props: ButtonProps) {
  return <Button {...props} style={{ margin: "10px 0px" }} />;
}

export default AuthFormButton;
