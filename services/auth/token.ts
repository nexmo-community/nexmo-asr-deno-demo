var data;

export const getToken = async (key: string | undefined) => {
  if (!key) {
    console.log("You are missing your Azure Subscription Key. You must add it as an environment variable.");
    return;
  };
  data = await fetch("https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issuetoken", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-length': '0',
      'Ocp-Apim-Subscription-Key':key.toString()
    }
  })
  var text = await data.text();
  return text; 
};
