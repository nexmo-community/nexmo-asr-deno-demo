import "https://deno.land/x/dotenv/load.ts";

const azureSubscriptionKey = Deno.env.get("AZURE_SUBSCRIPTION_KEY") || ''

export const translateText = async (text: string) => {
  console.log(azureSubscriptionKey)
  const response = await fetch("https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=de", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken(azureSubscriptionKey)}`
    },
    body: JSON.stringify(`[{'text': ${text}}]`)
  });
  console.log(`TOKEN: ${getToken(azureSubscriptionKey)}`)
  return response.json().then(response => { console.log(`INSIDE THE TRANSLATETEXT FUNCTION: ${JSON.stringify(response)}`) });
}

const getToken = async (key: string) => {
  const response = await fetch("https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issuetoken", {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': azureSubscriptionKey
    }
  })
  console.dir(`THIS IS THE RESPONSE: ${response}`);
  return response.json().then(response => { console.log(`INSIDE THE GETTOKEN FUNCTION: ${JSON.stringify(response)}`) });
}
