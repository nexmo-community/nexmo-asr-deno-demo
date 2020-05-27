var voiceChoice: any = { "name": "Salli", "code": "en-US" }

export const voicePicker = (voices: any, language: any) => {
  voiceChoice = voices.find((voice: any) => voice.code === language.code)
  if (voiceChoice === undefined) {
    voiceChoice = { "name": "Salli", "code": "en-US" }
  };
  return voiceChoice.name;
 };