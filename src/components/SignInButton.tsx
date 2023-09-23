import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
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
        <Dropdown.Item as="button" onClick={() => {handleLogin("popup")}}>
            Sign in using popup
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => {handleLogin("redirect")}}>
            Sign in using redirect
        </Dropdown.Item>
    </DropdownButton>
  );
};
