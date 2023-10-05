import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { loginRequest } from "../authConfig";
import { callGraph } from "../graph";
import "./css/MainContent.css"

type graphDataProps = {
  graphData: {
    givenName: string;
    surname: string;
    userPrincipalName: string;
    mail: string;
    id: string;
  };
};

export const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5>
          <center>Please sign in from the upper-right button</center>
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

const ProfileContent: any = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const RequestProfileData = () => {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callGraph(response.accessToken, "https://graph.microsoft.com/v1.0/me", "GET").then((response) =>
          setGraphData(response)
        );
      });
  };

  return (
    <>
      <h5 className="card-title">Welcome {accounts[0]?.name}</h5>
      <br />
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={RequestProfileData}
        >
          Show my profile
        </Button>
      )}
    </>
  );
};

const ProfileData = ({ graphData }: graphDataProps) => {
  return (
    <div className="profileData">
      <p>
        <strong>First Name: </strong> {graphData.givenName}
      </p>
      <p>
        <strong>Last Name: </strong> {graphData.surname}
      </p>
      <p>
        <strong>UPN: </strong> {graphData.userPrincipalName}
      </p>
      <p>
        <strong>Email: </strong> {graphData.mail}
      </p>
      <p>
        <strong>Id: </strong> {graphData.id}
      </p>
    </div>
  );
};
