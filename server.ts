import { opine } from "https://deno.land/x/opine@master/mod.ts";
import { languageList } from "./data/languages.ts";
import { voicesList } from "./data/voices.ts";
import { translateText } from "./services/translate.ts";
import { voicePicker } from "./services/voice_picker.ts";
import { languagePicker } from "./services/language_picker.ts";
import "https://deno.land/x/dotenv/load.ts";
const asrWebhook: string | undefined = Deno.env.get("VONAGE_ASR_WEBHOOK");
const app = opine();
const languageChoice = languagePicker(languageList);
const voiceChoice = voicePicker(voicesList, languageChoice);

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
      eventUrl: [asrWebhook],
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
  res.status = 200
  res.json([
    {
      action: 'talk',
      text: `This is what you said in English: ${mostConfidentResultsText}`
    },
    {
      action: 'talk',
      text: `This is your text translated into ${languageChoice.name}: ${await translateText(languageChoice.code.split('-')[0], mostConfidentResultsText)}`,
      voiceName: voiceChoice
    }
  ])
});

app.get("/webhooks/event", async function (req, res) {
  res.status = 204
})

app.listen({ port: 8000 });
