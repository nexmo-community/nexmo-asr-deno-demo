# Speech Translation Voice App with Vonage Automatic Speech Recognition

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.txt)

This is a voice application written in TypeScript and running on Deno that uses Vonage Automatic Speech Recognition (ASR) to convert the caller's spoken words into text. The text is then sent to Microsoft Azure Spech Translation service to translate into a randomly chosen second language. The original English text and the newly translated text along with identifying its language name is spoken back to the caller.

## Prerequisites

* [Deno](https://deno.land/) installed locally
* A [Nexmo account](https://dashboard.nexmo.com/sign-up?utm_source=DEV_REL&utm_medium=github&utm_campaign=nexmo-asr-deno-demo)
* A [Nexmo provisioned phone number](https://dashboard.nexmo.com)
* A [Microsoft Azure account](https://portal.azure.com)

## Installation

To install this application:

* Clone this repository locally
* Change into the directory of the app on your machine

## Usage

### Running Locally

To use this application:

* Set up a [Nexmo account](https://dashboard.nexmo.com/sign-up?utm_source=DEV_REL&utm_medium=github&utm_campaign=nexmo-asr-deno-demo)
* Purchase a Nexmo phone number
* Start your [ngrok server](https://ngrok.io) from the command line
* Update your number's webhook address in the [Nexmo Dashboard](https://dashboard.nexmo.com) to your ngrok URL
  * i.e. `https://my-ngrok-url.ngrok.io/webhooks/event`
* Copy the `.env.sample` file to `.env` and fill in the values for the variables
  * `AZURE_SUBSCRIPTION_KEY` is your API key for the Microsoft Azure Speech Translation service
  * `AZURE_ENDPOINT` is your regionally specific endpoint for the Microsoft Azure Speech Translation service
  * `VONAGE_ASR_WEBHOOK` is your externally accessible webhook URL to receive the text back from the Vonage ASR service
* Run the Deno server by executing the following command from inside the project folder: `deno run --allow-read --allow-env --allow-net server.ts`
* Call your Nexmo provisioned phone number and follow the instructions on the call

## License

This project is under the [MIT License](LICENSE)
