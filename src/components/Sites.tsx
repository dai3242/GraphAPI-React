import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import { SetStateAction, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginRequest } from "../authConfig";
import { callGraph } from "../graph";
import "./css/Sites.css";

import Button from "@mui/material/Button";
import {
  Alert,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { Lists } from "./Lists";

type graphSiteProps = {
  value?: siteData | undefined;
  error?: {};
};

type siteData =
  | {
      displayName: string;
      id: string;
      webUrl: string;
    }
  | undefined;

export const Sites = () => {
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
  const [siteData, setSiteData] = useState(undefined);
  const [inputData, setInputData] = useState<string>("");
  const [error, setError] = useState<string>("");

  const RequestProfileData = () => {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        setError("");
        callGraph(
          response.accessToken,
          `https://graph.microsoft.com/v1.0/sites?$search="${inputData}"`,
          "GET"
        )
          .then((response) => setSiteData(response?.value[0]))
          .catch((error) => setError(error.message));
      });
  };

  return (
    <>
      <div className="inputtext">Enter a SharePoint site name:</div>
      <RequestSite inputData={inputData} setInputData={setInputData} />
      <div className="button">
        <Button variant="contained" size="medium" onClick={RequestProfileData}>
          See this site's information
        </Button>
      </div>
      <ProfileData value={siteData} error={error} />
    </>
  );
};

const RequestSite = (props: {
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
            label="Site Name"
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

const ProfileData = ({ value, error }: graphSiteProps) => {
  return (
    <div>
      {error ? (
        <Alert severity="error" className="alert">
          Enter a valid SharePoint site name
        </Alert>
      ) : value ? (
        <>
          {" "}
          <Card sx={{ minWidth: 275, maxWidth: 600 }}>
            <CardContent>
              <div>
                <p>
                  <strong>Site Name: </strong>
                  <br /> {value?.displayName}
                </p>
                <p>
                  <strong>Site URL: </strong>
                  <br /> {value?.webUrl}
                </p>
                <p>
                  <strong>Site ID: </strong>
                  <br /> {value?.id}
                </p>
              </div>
              <a href={value?.webUrl} target="_blank" rel="noreferrer noopener">
                Go to this site
              </a>
            </CardContent>
          </Card>
          <Lists siteId={value.id}></Lists>
        </>
      ) : (
        <Alert severity="error" className="alert">
          Enter a valid SharePoint site name
        </Alert>
      )}
    </div>
  );
};
