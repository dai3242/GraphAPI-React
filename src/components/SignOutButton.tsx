import { useMsal } from "@azure/msal-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <Button
      variant="outline-primary"
      size="lg"
      onClick={() => {
        instance.logoutPopup({
          postLogoutRedirectUri: "/",
          mainWindowRedirectUri: "/",
        });
      }}
    >
      Sign Out
    </Button>
  );
};
