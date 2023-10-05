import { Link } from "react-router-dom";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

import "./css/NavigationBar.css";

export const NavigationBar = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="Navbar">
      <div className="Title">Graph API with react</div>
      <ul>
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/users">
            Users
          </Link>
        </li>
        <li>
          <Link className="link" to="/groups">
            Groups
          </Link>
        </li>
        <li>
          <Link className="link" to="/sites">
            Sites & Lists
          </Link>
        </li>
      </ul>
      <div className="Button">
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </div>
    </div>
  );
};
