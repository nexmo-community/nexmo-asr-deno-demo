var voiceChoice: any = { "name": "Salli", "code": "en-US" }

export const voicePicker = (voices: Array<object>, language: any) => {
  voiceChoice = voices.find((voice: any) => voice.code === language.code)
  if (language.code.split('-')[0] === 'ar') {
    voiceChoice = { "name": "Laila", "code": "ara-XWW" }
  };
  if (voiceChoice === undefined) {
    voiceChoice = { "name": "Salli", "code": "en-US" }
  };
  return voiceChoice.name;
 };