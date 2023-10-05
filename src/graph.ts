export async function callGraph(accessToken: string, url: string, method: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: method,
    headers: headers,
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}