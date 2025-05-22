# AutoRTI

This repository contains the front-end HTML page and the Google Apps Script used by the AutoRTI project.

## Files

- `AutoRTI App Script` – Google Apps Script code that receives form submissions and writes data to a Google Sheet.
- `HTML` – the web page users interact with.

## Deploying the Apps Script

1. Open [Google Apps Script](https://script.google.com) and create a **New project**.
2. Replace the contents of the default `Code.gs` file with the code from `AutoRTI App Script` in this repository.
3. On **line 2** of the script, replace `PASTE_YOUR_SPREADSHEET_ID_HERE` with the ID of your Google Spreadsheet. The ID is the part of the sheet URL between `/d/` and `/edit`.
4. Save the project.
5. Click **Deploy → New deployment**, choose **Web app**, set *Execute as* to your account and *Who has access* to **Anyone**.
6. Deploy the project and copy the **Web app URL**. You will paste this URL into the HTML page.

## Configuring and Opening the HTML page

1. Open the `HTML` file from this repository in a text editor.
2. Near the bottom (around line 437) find `const GOOGLE_SHEETS_WEB_APP_URL = '...';` and replace the value with the Web app URL you copied from the Apps Script deployment.
3. Save the file.
4. Open the HTML file in your web browser (double‑click it or serve it with a local web server). The page will send data to your Google Sheet using the configured Apps Script.
