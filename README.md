# AutoRTI
Simple behavior tracking demo that logs events to a Google Sheet.

### Setup

1. Create a Google Spreadsheet and deploy the accompanying Apps Script as a Web App.
2. Replace `PASTE_YOUR_SPREADSHEET_ID_HERE` in `AutoRTI App Script` with your spreadsheet ID.
3. Update the `GOOGLE_SHEETS_WEB_APP_URL` constant in `HTML` to point to the deployed web app URL.
4. Open the HTML file in a browser. On first load you will be prompted for your name; this will be stored with each logged entry.

Gameplay data is sent with the active roster name as the sheet tab. Rosters are stored in a separate `Rosters` sheet.
