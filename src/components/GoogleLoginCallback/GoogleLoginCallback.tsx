import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import useGoogleAuthCallbackParams from "../../hooks/useGoogleAuthCallbackParams";
import AppContainer from "../common/AppContainer/AppContainer";
import Loader from "../common/Loader/Loader";

function GoogleLoginCallback() {
  const { code, state } = useGoogleAuthCallbackParams();
  const navigate = useNavigate();
  const { user, loading, saveToken } = useAuth();

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    if (!state || !code) {
      return;
    }
    setIsLoading(true);
    loginWithGoogle(state, code)
      .then((res) => {
        if (res) {
          setIsLoading(false);
          saveToken(res.token);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
  }, [state, code, navigate, saveToken]);

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <AppContainer>
      {user ? (
        <p>Successful login, you will be redirected to main page soon...</p>
      ) : (
        <p>
          Something went wrong. You will be redirected to login page soon...
        </p>
      )}
    </AppContainer>
  );
}

export default GoogleLoginCallback;
