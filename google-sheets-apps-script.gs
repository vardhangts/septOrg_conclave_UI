const SHEET_ID = '16q2fjNMGNTjhq7Z8t0IdyV0n0zMu-8w_LhU5l82o7AY';
const SHEET_NAME = 'Registrations';

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Age', 'Email', 'Phone', 'City', 'Occupation', 'Payload Timestamp']);
  }
  return sheet;
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (!payload.name || (!payload.email && !payload.phone)) {
      throw new Error('Missing required fields: name and either email or phone.');
    }
    if (!payload.age) {
      throw new Error('Missing required field: age.');
    }

    const sheet = getSheet();
    const row = [
      new Date(),
      payload.name || '',
      payload.age || '',
      payload.email || '',
      payload.phone || '',
      payload.city || '',
      payload.occupation || '',
      payload.timestamp || '',
    ];
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message || 'Unknown error' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'Google Sheets endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
