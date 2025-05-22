# AutoRTI
Repository for Auto RTI materials

## Configuration

Create a `config.js` file in the project root that defines your Google Spreadsheet ID and the published Web App URL used by the application. An example file is provided as `config.example.js`:

```javascript
window.AutoRTI_CONFIG = {
  SPREADSHEET_ID: 'PASTE_SPREADSHEET_ID_HERE',
  WEB_APP_URL: 'PASTE_WEB_APP_URL_HERE'
};
```

You can copy the example and fill in your details:

```bash
cp config.example.js config.js
# edit config.js and replace the placeholders
```

Alternatively, if the variables `SPREADSHEET_ID` and `WEB_APP_URL` are defined in your environment you can generate the file with:

```bash
envsubst < config.example.js > config.js
```

Make sure `config.js` is hosted alongside `index.html`.

In your Apps Script project, set a script property named `SPREADSHEET_ID` to the same value so that `AutoRTI.gs` can open the correct spreadsheet.
