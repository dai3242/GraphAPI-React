import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (loginType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <DropdownButton
      variant="secondary"
      className="ml-auto"
      drop="start"
      title="Sign In"
    >
      <Dropdown.Item
        as="button"
        onClick={() => {
          handleLogin("popup");
        }}
      >
        Sign out using popup
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        onClick={() => {
          handleLogin("redirect");
        }}
      >
        Sign out using redirect
      </Dropdown.Item>
    </DropdownButton>
  );
};
