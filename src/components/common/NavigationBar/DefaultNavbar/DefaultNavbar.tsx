import { useAuth } from "../../../../hooks/useAuth";
import Loader from "../../Loader/Loader";
import NavbarLink from "../NavbarLink/NavbarLink";
import TopBar from "../TopBar/TopBar";

interface Props {
  integrationActivated: string | undefined;
}

const DefaultNavbar = ({ integrationActivated }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  return (
    <TopBar>
      <NavbarLink to="/">Timer</NavbarLink>
      {integrationActivated === "true" && !user ? (
        <>
          <NavbarLink to="/login">Login</NavbarLink>
          <NavbarLink to="/register">Register</NavbarLink>
        </>
      ) : !!user ? (
        <NavbarLink to="/logout">Logout</NavbarLink>
      ) : null}
    </TopBar>
  );
};

export default DefaultNavbar;
