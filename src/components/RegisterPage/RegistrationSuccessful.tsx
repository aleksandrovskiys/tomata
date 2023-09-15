import Button from "../common/Button/Button";

export function RegistrationSuccessful() {
  return (
    <div>
      <h1>Registration successful!</h1>
      <Button
        autoFocus
        text="Go Home"
        onClick={() => console.log("GO home pressed")}
      />
    </div>
  );
}

export default RegistrationSuccessful;
