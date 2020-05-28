import "https://deno.land/x/dotenv/load.ts";
const azureEndpoint: any = Deno.env.get("AZURE_ENDPOINT");
var data;

export const getToken = async (key: string | undefined) => {
  if (!key) {
    console.log("You are missing your Azure Subscription Key. You must add it as an environment variable.");
    return;
  };
  if (!azureEndpoint) {
    console.log("You are missing your Azure endpoint definition. You must add it as an environment variable.");
  };
  data = await fetch(azureEndpoint.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-length': '0',
      'Ocp-Apim-Subscription-Key':key.toString()
    }
  })
  const text = await data.text();
  return text; 
};
