export const getToken = async (key: string) => {
  console.log(`THE KEY IN THE GETTOKEN FUNCTION: ${key}`);
  const response = (await fetch("https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issuetoken", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-length': '0',
      'Ocp-Apim-Subscription-Key': key.toString()
    }
  }));
  console.log(`THIS IS THE RESPONSE INSIDE THE GET TOKEN FUNCTION: ${response}`);
  return response.json().then(response => { console.log(`INSIDE THE GETTOKEN RETURN FUNCTION: ${JSON.stringify(response)}`) });
}
