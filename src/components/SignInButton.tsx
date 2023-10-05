import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <Button
      variant="outline-primary"
      size="lg"
      onClick={() => {
        instance.loginPopup(loginRequest).catch((e) => {
          console.log(e);
        });
      }}
    >
      Sign In
    </Button>
  );
};
