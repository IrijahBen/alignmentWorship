/**
 * Alignment Worship Experience: volunteer registration backend.
 * Paste this into a Google Sheet's Apps Script editor (Extensions > Apps Script),
 * then deploy it as a Web app (see README.md).
 */
const SHEET_NAME = 'Volunteers';

const HEADERS = [
  'Submitted at', 'Full name', 'Phone', 'Email', 'Gender', 'Church or ministry', 'Location',
  'Department', 'Previous experience', 'Available for volunteers meeting',
  'Willing to serve faithfully', 'Notes', 'Agreed to be contacted'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const p = e.parameter || {};

    const sheet = getSheet_();
    const email = clean_(p.email).toLowerCase();

    // Refuse a second registration with the same email address.
    if (email && sheet.getLastRow() > 1) {
      const emails = sheet.getRange(2, 4, sheet.getLastRow() - 1, 1).getValues().flat();
      if (emails.some(function (v) { return String(v).toLowerCase() === email; })) {
        return json_({ result: 'duplicate' });
      }
    }

    sheet.appendRow([
      new Date(),
      safe_(p.fullName), "'" + clean_(p.phone), safe_(p.email), safe_(p.gender),
      safe_(p.church), safe_(p.location), safe_(p.department), safe_(p.experience),
      safe_(p.availability), safe_(p.willingness), safe_(p.notes), safe_(p.consent)
    ]);
    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function clean_(v) { return String(v == null ? '' : v).trim().slice(0, 1500); }

// Stops a cell that starts with = + - @ from being run as a spreadsheet formula.
function safe_(v) {
  const s = clean_(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
