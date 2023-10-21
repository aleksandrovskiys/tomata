import { useSearchParams } from "react-router-dom";
import AppContainer from "../common/AppContainer/AppContainer";

function GoogleAuthCallback() {
  const [searchParams] = useSearchParams();

  return (
    <AppContainer>
      <h4>code: {searchParams.get("code")}</h4>
      <h4>state: {searchParams.get("state")}</h4>
      <h4>scope: {searchParams.get("scope")}</h4>
      <h4>authUser {searchParams.get("authuser")}</h4>
      <h4>prompt: {searchParams.get("prompt")}</h4>
    </AppContainer>
  );
}

export default GoogleAuthCallback;
