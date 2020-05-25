export const getToken = async (key: string) => {
  const response = await fetch("https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issuetoken", {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key
    }
  })
  console.dir(`THIS IS THE RESPONSE: ${response}`);
  return response.json().then(response => { console.log(`INSIDE THE GETTOKEN FUNCTION: ${JSON.stringify(response)}`) });
}
