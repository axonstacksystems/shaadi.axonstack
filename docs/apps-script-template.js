/**
 * Shaadi Cards — RSVP click counter
 *
 * Records every Yes / No button click into the first sheet.
 * Columns: Submitted At | Card | Attending
 *
 * Setup:
 * 1. Open (or create) a Google Sheet.
 * 2. Extensions → Apps Script → replace boilerplate with this file.
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the /exec URL → paste into delivered-orders.ts → rsvp.webhookUrl
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var params = (e && e.parameter) || {};

    // Write header row once
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted At", "Card", "Attending"]);
    }

    sheet.appendRow([
      params.submittedAt || new Date().toISOString(),
      params.title || params.slug || "",
      params.attending || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Open the Web app URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput(
    "Shaadi Cards RSVP collector is live.",
  ).setMimeType(ContentService.MimeType.TEXT);
}
