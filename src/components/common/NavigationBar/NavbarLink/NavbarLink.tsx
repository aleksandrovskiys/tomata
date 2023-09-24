import { NavLink, NavLinkProps } from "react-router-dom";
import "./NavbarLink.css";

const NavbarLink = (props: NavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive ? " navbarlink active" : "navbarlink"
      }
    >
      {props.children}
    </NavLink>
  );
};

export default NavbarLink;
