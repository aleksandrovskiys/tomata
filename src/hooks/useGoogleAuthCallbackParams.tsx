import { useSearchParams } from "react-router-dom";

const useGoogleAuthCallbackParams = () => {
  const [searchParams] = useSearchParams();
  const [code, state] = [searchParams.get("code"), searchParams.get("state")];
  return { code, state };
};

export default useGoogleAuthCallbackParams;
