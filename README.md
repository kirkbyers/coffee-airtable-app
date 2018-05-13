# Coffee Airtable App

A form for collecting refractometer readings on coffee at work and recording inputs into airtable.

## Instructions

### Prerequisites

- Node or Docker installed
- An [Airtable](https://airtable.com/) API key, base ID, and table name

### Run With Docker

1. Define the [env vars bellow](#Env-Vars) in an env file.
2. Run `docker run --env-file ./path/to/file.env --expose <PORT> -p <PORT>:<PORT> kirkbyers/coffee-airtable-app`.

### Run Locally

1. Run `npm i`.
2. Set the env vars bellow for your current session with `export $VAR=value`.
3. Run `npm start`.

## Env Vars

Set the following env vars before starting the server:

- `AIRTABLE_API_KEY` Your Airtable API keep. Keep it a secret.
- `AIRTABLE_BASE` Your Airtable Base ID.
- `AIRTABLE_TABLE` Your Airtable table name.
- Optionally you can set `PORT` to serve the app from a different port. Defaults to `3000`.
