/**
 * Shaadi Cards — RSVP collector
 *
 * Paste this into a new Google Apps Script project (script.google.com →
 * New project), bind it to a Google Sheet, and deploy as a Web App with
 * "Anyone" access. Then put the resulting Web App URL into the
 * delivered order's `rsvp.webhookUrl` in src/data/delivered-orders.ts.
 *
 * --- Setup steps ---
 * 1. Create a Google Sheet. The first sheet's row 1 is reserved for
 *    headers — leave it empty, this script will populate it on first
 *    submission.
 * 2. Tools → Script editor (or Extensions → Apps Script in newer Sheets).
 * 3. Replace the boilerplate with this file.
 * 4. Click Deploy → New deployment → Type: Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL (looks like
 *    https://script.google.com/macros/s/AKfy.../exec).
 * 6. Paste it into delivered-orders.ts → rsvp.webhookUrl, push, deploy.
 *
 * To re-deploy after edits: Deploy → Manage deployments → pencil icon →
 * "New version" → Deploy. Use the SAME deployment URL (do not create a
 * new one each time, the URL changes).
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10_000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const params = (e && e.parameter) || {};

    // Header row: write once if the sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At",
        "Slug",
        "Card Title",
        "Name",
        "Attending",
        "Guest Count",
        "Message",
      ]);
    }

    sheet.appendRow([
      params.submittedAt || new Date().toISOString(),
      params.slug || "",
      params.title || "",
      params.name || "",
      params.attending || "",
      params.guestCount || "",
      params.message || "",
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

// Sanity check while editing — open the Web app URL in a browser to
// confirm the deployment is live.
function doGet() {
  return ContentService.createTextOutput(
    "Shaadi Cards RSVP collector is live.",
  ).setMimeType(ContentService.MimeType.TEXT);
}
