# Google Sheets Apps Script Setup

Use this guide to deploy a Google Apps Script web app that accepts form submissions from the React Native registration screen and appends them to your Google Sheet.

## 1. Open the Google Sheet

1. Open your sheet:
   https://docs.google.com/spreadsheets/d/16q2fjNMGNTjhq7Z8t0IdyV0n0zMu-8w_LhU5l82o7AY/edit?usp=sharing
2. In the menu, choose **Extensions > Apps Script**.

## 2. Paste the script

Create a new script and paste the contents of `google-sheets-apps-script.gs`.

## 3. Update the sheet ID if needed

The script currently uses this sheet ID:

```js
const SHEET_ID = '16q2fjNMGNTjhq7Z8t0IdyV0n0zMu-8w_LhU5l82o7AY';
```

If you change the sheet location later, update `SHEET_ID` to the new spreadsheet ID.

## 4. Deploy as a web app

1. Click **Deploy > New deployment**.
2. Select **Web app**.
3. Set **Execute as**: `Me`.
4. Set **Who has access**: `Anyone` or `Anyone with the link`.
5. Deploy and copy the **Web app URL**.

## 5. Configure your React Native app

Open `src/config/googleSheets.ts` and set `sheetEndpointUrl` to the deployed web app URL.

Example:

```ts
export const googleSheetsConfig = {
  sheetUrl: 'https://docs.google.com/spreadsheets/d/16q2fjNMGNTjhq7Z8t0IdyV0n0zMu-8w_LhU5l82o7AY/edit?usp=sharing',
  sheetEndpointUrl: 'https://script.google.com/macros/s/AKfycbwJil2wjKW5FFAGkMZ1qm2R4-Fg-rH8xhuIhYxIjsTCp-Eymhe-ssCREZeW3NbrrWbqAQ/exec',
};
```

## 6. Test submission

Send a POST request with JSON payload to your web app URL.

Required fields:
- `name`
- `age`
- `email`
- `phone`

Optional fields:
- `city`
- `occupation`

Your React Native form already sends the correct payload.
