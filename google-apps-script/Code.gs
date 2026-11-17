/**
 * FIKNORIA TREASURE - Google Apps Script (Code.gs)
 * Contact form ka data Google Sheet mein save karta hai.
 *
 * Isay Google Sheet ke andar se kholein:
 *   Sheet > Extensions > Apps Script > yeh poora code paste karein.
 * Poore steps README.md mein hain.
 */

const SHEET_NAME = "Messages";           // Sheet ke tab ka naam (na ho to khud ban jata hai)
const NOTIFY_EMAIL = "raheelakhanm1986@gmail.com";   // Naya message aane par email milegi ("" likh dein to email band)

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Agar tab nahi hai to naya banao + heading row lagao
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Date & Time", "Name", "Email", "Phone", "Subject", "Message"]);
      sheet.getRange("A1:F1").setFontWeight("bold").setBackground("#d8f3f2");
      sheet.setFrozenRows(1);
    }

    const p = e.parameter;

    // Honeypot: agar bot ne 'website' bhara ho to save mat karo
    if (p.website) return ContentService.createTextOutput("ignored");

    sheet.appendRow([
      new Date(),
      p.name || "",
      p.email || "",
      p.phone || "",
      p.subject || "",
      p.message || ""
    ]);

    // Email notification
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New website message from " + (p.name || "visitor"),
        body: "Name: " + p.name + "\nEmail: " + p.email + "\nPhone: " + p.phone +
              "\nSubject: " + p.subject + "\n\nMessage:\n" + p.message
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Browser mein URL kholne par test message dikhane ke liye
function doGet() {
  return ContentService.createTextOutput("Fiknoria Treasure form endpoint is working.");
}
