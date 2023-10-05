import React from "react";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import { SetStateAction, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginRequest } from "../authConfig";
import { callGraph } from "../graph";
import "./css/Users.css";
import { Alert, Button, Card, CardContent, TextField } from "@mui/material";

type graphDataProps = {
  graphData: {
    givenName: string;
    surname: string;
    userPrincipalName: string;
    mail: string;
    id: string;
    error: {};
  } | null;
};

export const Users = () => {
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

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [userData, setUserData] = useState(null);
  const [inputData, setInputData] = useState<string>("");

  const RequestProfileData = () => {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callGraph(
          response.accessToken,
          `https://graph.microsoft.com/v1.0/users/${inputData}`,
          "GET"
        ).then((response) => setUserData(response));
      });
  };

  return (
    <>
      <div className="inputtext">Enter a User Principal Name:</div>
      <RequestUser inputData={inputData} setInputData={setInputData} />
      <div className="button">
        <Button variant="contained" size="medium" onClick={RequestProfileData}>
          See this user's profile
        </Button>
      </div>
      <ProfileData graphData={userData} />
    </>
  );
};

const RequestUser = (props: {
  inputData: string;
  setInputData: React.Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.setInputData(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            id="outlined-basic"
            label="User Principal Name"
            variant="outlined"
            margin="normal"
            value={props.inputData}
            onChange={(e) => handleChange(e)}
          />
        </form>
      </div>
    </>
  );
};

const ProfileData = ({ graphData }: graphDataProps) => {
  return (
    <div>
      {graphData?.error ? (
        <Alert severity="error" className="alert">
          Enter a valid SharePoint site name
        </Alert>
      ) : (
        <Card sx={{ minWidth: 275, maxWidth: 600 }}>
          <CardContent>
            <div>
              <p>
                <strong>First Name: </strong> {graphData?.givenName}
              </p>
              <p>
                <strong>Last Name: </strong> {graphData?.surname}
              </p>
              <p>
                <strong>UPN: </strong> {graphData?.userPrincipalName}
              </p>
              <p>
                <strong>Email: </strong> {graphData?.mail}
              </p>
              <p>
                <strong>Id: </strong> {graphData?.id}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
