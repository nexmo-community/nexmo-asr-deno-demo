export const languagePicker = (languages: any) => {
 const language = languages[Math.floor(Math.random() * languages.length)];
 return language;
}