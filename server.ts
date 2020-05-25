import { opine } from "https://deno.land/x/opine@master/mod.ts";
import { languageList } from "./languages.ts";
import { translateText } from "./services/translate.ts";
import "https://deno.land/x/dotenv/load.ts";

const app = opine();
const azureSubscriptionKey = Deno.env.get("AZURE_SUBSCRIPTION_KEY") || ''
const azureEndpoint = Deno.env.get("AZURE_ENDPOINT") || ''

app.get("/webhooks/answer", async function (req, res) {
  const uuid = req.query.uuid
  res.status = 200
  res.json([
    {
      action: 'talk',
      text: 'Welcome to the Vonage Universal Translator Randomizer brought to you by Vonage Automatic Speech Recognition run on Deno. Please say something.',
      bargeIn: true
    },
    {
      eventUrl: ['https://example.ngrok.io/webhooks/asr'],
      eventMethod: 'GET',
      action: 'input',
      speech: {
        uuid: [uuid],
        language: 'en-us'
      }
    }
  ]);
});

app.get("/webhooks/asr", async function (req, res) {
  const data = await JSON.parse(req.query.speech)
  const mostConfidentResultsText = data.results[0].text
  const translateOptions = {
    method: 'POST',
    url: 'translate',
    qs: {
      'api-version': '3.0',
      'to': ['de', 'it']
    },
    headers: {
      'Ocp-Apim-Subscription-Key': azureSubscriptionKey.toString(),
      'Content-type': 'application/json'
    },
    body: JSON.stringify([{
      'text': `${mostConfidentResultsText}`
    }]),
    json: true,
  }
  res.status = 200
  res.json([
    {
      action: 'talk',
      text: `This is what you said in English: ${mostConfidentResultsText}`
    },
    {
      action: 'talk',
      text: `This is your text translated into another language: ${await translateText(mostConfidentResultsText)}`
    }
  ])
});

app.get("/webhooks/event", async function (req, res) {
  res.status = 204
})

app.listen({ port: 8000 });
