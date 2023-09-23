import { useState } from "react";

import { PageLayout } from "./components/PageLayout";
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph";
import { ProfileData } from "./components/ProfileData";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import "./App.css";

import Button from "react-bootstrap/Button";

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
        callMsGraph(response.accessToken).then((response) =>
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
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile Information
        </Button>
      )}
    </>
  );
};

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5>
          <center>Please sign-in to see your profile information</center>
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

function App() {
  return (
    <PageLayout>
      <center>
        <MainContent />
      </center>
    </PageLayout>
  );
}

export default App;
