import { getToken } from './auth/token.ts';
import "https://deno.land/x/dotenv/load.ts";
import { languageList } from '../languages.ts';
const azureSubscriptionKey: string | undefined = Deno.env.get("AZURE_SUBSCRIPTION_KEY");

export const translateText = async (languageCode: string, text: string) => {
  const token =  await getToken(azureSubscriptionKey);
  const response = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${languageCode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify([{"text": text}])
  });
  var translation = await response.json();
  return translation[0][<any>"translations"][0][<any>"text"]
};
