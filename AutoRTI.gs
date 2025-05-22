function doPost(e) {
  // Read the spreadsheet ID from script properties
  var props = PropertiesService.getScriptProperties();
  var spreadsheetId = props.getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) {
    throw new Error('Missing SPREADSHEET_ID script property');
  }
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = e.parameter;
  }
  
  // Get tab name, username, and fields
  var sheetName = data.sheetName || "Misc";
  var username = data.username || "Anonymous";
  var now = new Date();

  // Create the sheet if it doesn't exist
  var sheet;
  try {
    sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      // Add header row with Username and Timestamp first
      var headers = ["Username", "Timestamp"];
      for (var key in data) {
        if (key !== "sheetName" && key !== "username") headers.push(key);
      }
      sheet.appendRow(headers);
      sheet.getRange(1,1,1,headers.length).setBackground("#DDEEFF").setFontWeight("bold");
    }
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({result:"sheet error"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Build the row: Username, Timestamp, [all fields in header order]
  var header = sheet.getDataRange().getValues()[0];
  var row = [username, now];
  for (var i = 2; i < header.length; i++) {
    row.push(data[header[i]] || "");
  }
  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({result:"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
