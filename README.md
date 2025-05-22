# AutoRTI
Repository for Auto RTI materials

## Deployment

The repository contains:

- **HTML** – the main front-end page for the application.
- **AutoRTI App Script** – Google Apps Script that receives data and writes to a Google Sheet.

Follow the steps below to deploy both pieces and connect them.

### 1. Prepare the Google Sheet

1. Create a new Google Spreadsheet in your Google Drive.
2. Copy the spreadsheet ID from its URL. The ID is the long string between `/d/` and `/edit`.

### 2. Deploy the Google Apps Script

1. In [Google Apps Script](https://script.google.com/), create a new project.
2. Replace the default `Code.gs` content with the contents of the file **`AutoRTI App Script`** from this repository.
3. On line 2 of the script replace `PASTE_YOUR_SPREADSHEET_ID_HERE` with the ID from step 1. The line should look like:
   ```javascript
   var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
   ```
4. Click **Deploy → New deployment** and choose **Web app**.
   - Set *Execute as* to **Me**.
   - Set *Who has access* to **Anyone** (or your preferred setting).
5. After deploying, copy the generated **Web app URL**; you will need it for the HTML file.

### 3. Configure the HTML Page

1. Open the `HTML` file in a text editor.
2. Around line 437 you will find the following constant:
   ```javascript
   const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/.../exec';
   ```
3. Replace the URL in that line with the Web app URL from the Apps Script deployment.
4. Save the file.

### 4. Hosting the HTML Page

The HTML file can be opened directly in a browser or hosted on any static web server (for example GitHub Pages or Google Sites). No additional dependencies are required because Bootstrap, Chart.js, and Canvas-Confetti are loaded from public CDNs.

Once both the Apps Script and the HTML page are configured, loading the HTML page will communicate with your deployed web app and write data to the specified spreadsheet.


## Development

This project includes a small Jest test suite for validating the JavaScript logic used in the HTML file. To work on the tests or run them locally you will need Node.js installed (version 18 or newer is recommended).

1. Install the development dependencies with:

```bash
npm install
```

2. Run the test suite using:

```bash
npm test
```

The `npm test` command runs Jest against the files in the `tests/` directory.
