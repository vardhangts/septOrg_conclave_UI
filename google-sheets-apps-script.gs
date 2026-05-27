const SHEET_ID = '1OGMsiRNUFuOMT8AX7Cr84otLsMQA4VKgD52oXVVZsqk';
const SHEET_NAME = 'Registrations';

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'City', 'Occupation', 'Payload Timestamp']);
  }
  return sheet;
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (!payload.name || (!payload.email && !payload.phone)) {
      throw new Error('Missing required fields: name and either email or phone.');
    }
    if (!payload.occupation) {
      throw new Error('Missing required field: occupation.');
    }

    const sheet = getSheet();
    const row = [
      new Date(),
      payload.name || '',
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
