import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { finalizeSignupWithGoogle } from "../../api/api";
import useGoogleAuthCallbackParams from "../../hooks/useGoogleAuthCallbackParams";
import AppContainer from "../common/AppContainer/AppContainer";
import Loader from "../common/Loader/Loader";

function GoogleSignupCallback() {
  const { code, state } = useGoogleAuthCallbackParams();
  const navigate = useNavigate();

  const [validated, setValidated] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    if (!state || !code) {
      return;
    }
    setIsLoading(true);
    finalizeSignupWithGoogle(state, code)
      .then((res) => {
        if (res) {
          setValidated(true);
          setIsLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setValidated(false);
        setIsLoading(false);
        setTimeout(() => {
          navigate("/register");
        }, 2000);
      });
  }, [state, code, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppContainer>
      {validated ? (
        <p>
          Registration successful, you will be redirected on login page soon...
        </p>
      ) : (
        <p>
          Something went wrong. You will be redirected to register page soon...
        </p>
      )}
    </AppContainer>
  );
}

export default GoogleSignupCallback;
