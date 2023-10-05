import { useMsal } from "@azure/msal-react";

import { SetStateAction, useState } from "react";
import { loginRequest } from "../authConfig";
import { callGraph } from "../graph";
import { Alert, Button, Card, CardContent, TextField } from "@mui/material";

type graphListProps = {
  value?: listData | undefined;
  error?: {};
};

type listData =
  | {
      id: string;
      displayName: string;
      webUrl: string;
    }
  | undefined;

export const Lists = ({ siteId }: { siteId: string | undefined }) => {
  const { instance, accounts } = useMsal();
  const [listData, setListData] = useState(undefined);
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
          `https://graph.microsoft.com/v1.0/sites/${siteId}/lists?$filter=displayName eq '${inputData}'`,
          "GET"
        )
          .then((response) => setListData(response?.value[0]))
          .catch((error) => setError(error.message));
      });
  };

  return (
    <>
      <hr />
      <div className="inputtext">Enter a list name of the above site:</div>
      <RequestList inputData={inputData} setInputData={setInputData} />
      <div className="button">
        <Button variant="contained" size="medium" onClick={RequestProfileData}>
          See this list's information
        </Button>
      </div>
      <ProfileData value={listData} error={error} />
    </>
  );
};

const RequestList = (props: {
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
            label="List Name"
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

const ProfileData = ({ value, error }: graphListProps) => {

  console.log("valueis", value);
  return (
    <div>
      {error ? (
        <Alert severity="error" className="alert">
          Enter a valid list name
        </Alert>
      ) : value ? (
        <>
          {" "}
          <Card sx={{ minWidth: 275, maxWidth: 600 }}>
            <CardContent>
              <div>
                <p>
                  <strong>List Name: </strong>
                  <br /> {value?.displayName}
                </p>
                <p>
                  <strong>List URL: </strong>
                  <br /> {value?.webUrl}
                </p>
                <p>
                  <strong>List ID: </strong>
                  <br /> {value?.id}
                </p>
              </div>
              <a href={value?.webUrl} target="_blank" rel="noreferrer noopener">
                Go to this List
              </a>
            </CardContent>
          </Card>
        </>
      ) : (
        <Alert severity="error" className="alert">
          Enter a valid list name
        </Alert>
      )}
    </div>
  );
};
