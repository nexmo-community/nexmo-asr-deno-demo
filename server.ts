import { opine } from "https://deno.land/x/opine@master/mod.ts";
import { languageList } from "./data/languages.ts";
import { voicesList } from "./data/voices.ts";
import { translateText } from "./services/translate.ts";
import { voicePicker } from "./services/voice_picker.ts";
import { languagePicker } from "./services/language_picker.ts";
import "https://deno.land/x/dotenv/load.ts";
const app = opine();

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
      eventUrl: [`${req.headers.get("x-forwarded-proto") || "http"}://${req.headers.get("host")}/webhooks/asr`],
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
  var mostConfidentResultsText;
  if (!data.results) {
    console.log("Vonage ASR did not pick up what you tried to say");
    mostConfidentResultsText = 'Vonage ASR did not pick up your speech. Please call back and try again.';
  } else {
    mostConfidentResultsText = data.results[0].text;
  };
  const languageChoice = languagePicker(languageList);
  const voiceChoice = voicePicker(voicesList, languageChoice);
  console.log(`Language to translate into: ${languageChoice.name} and Vonage language voice being used: ${voiceChoice}`);
  res.status = 200
  res.json([
    {
      action: 'talk',
      text: `This is what you said in English: ${mostConfidentResultsText}`
    },
    {
      action: 'talk',
      text: `This is your text translated into ${languageChoice.name}`
    },
    {
      action: 'talk',
      text: `${await translateText(languageChoice.code.split('-')[0], mostConfidentResultsText)}`,
      voiceName: voiceChoice
    }
  ])
});

app.get("/webhooks/event", async function (req, res) {
  res.status = 204
})

app.listen({ port: 8000 });
console.log("Deno is running on port 8000");