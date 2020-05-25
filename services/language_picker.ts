export const languagePicker = (languages: any) => {
  return languages[Math.floor(Math.random() * languages.length)];
}