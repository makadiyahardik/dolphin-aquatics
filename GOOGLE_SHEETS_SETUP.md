# Google Sheets Form Integration Guide

This guide explains how to connect the Dolphin Aquatics enrollment form to Google Sheets for free.

---

## Overview

When users submit the "Enroll Now" form, their data is automatically saved to a Google Sheet. This is completely free with no monthly limits.

**How it works:**
```
User fills form → Form sends data to Google Script → Script adds row to Sheet
```

---

## Setup Steps (5 minutes)

### Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it **"Dolphin Enrollments"** (click "Untitled spreadsheet" at top)
4. In **Row 1**, add these headers:

| A | B | C | D | E |
|---|---|---|---|---|
| Name | Email | Phone | Message | Date |

5. Save the spreadsheet (it auto-saves)

---

### Step 2: Add Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab opens with the script editor
3. **Delete all existing code** in the editor
4. **Paste this code:**

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.name,
    data.email,
    data.phone,
    data.message,
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Click **Save** (Ctrl+S) or the floppy disk icon
6. Name the project **"Dolphin Form Handler"** when prompted

---

### Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** (Select type) → Choose **Web app**
3. Configure the deployment:
   - **Description:** Form submission handler
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Click **Authorize access** when prompted
6. Select your Google account
7. If you see "Google hasn't verified this app":
   - Click **Advanced**
   - Click **Go to Dolphin Form Handler (unsafe)**
   - Click **Allow**
8. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/xxx.../exec`)

---

### Step 4: Add URL to Environment File

1. Open `.env.local` file in the project root (create if doesn't exist)
2. Add your Google Script URL:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec
```

3. Save the file
4. Restart your dev server (`npm run dev`)

**Note:** The `.env.local` file is gitignored for security. Never commit this file to the repository.

**For production deployment (Vercel, etc.):**
- Add `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` to your environment variables in the hosting platform's dashboard

---

## Testing

1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000
3. Click **Enroll Now** button
4. Fill out the form with test data
5. Click **Submit Enquiry**
6. Check your Google Sheet - the data should appear!

---

## Updating the Script

If you need to update the Apps Script code:

1. Go to [script.google.com](https://script.google.com)
2. Open your project
3. Make changes to the code
4. Click **Deploy** → **Manage deployments**
5. Click the **pencil icon** (Edit)
6. Change **Version** to **New version**
7. Click **Deploy**

**Important:** The URL stays the same, no code changes needed on the website.

---

## Troubleshooting

### Form submits but no data in sheet
- Check if the Web App URL is correct in `Footer.jsx`
- Make sure the script is deployed with "Anyone" access
- Check the Apps Script execution logs: **View** → **Execution log**

### "Google hasn't verified this app" warning
- This is normal for personal scripts
- Click **Advanced** → **Go to [Project Name] (unsafe)**
- This is safe since you created the script yourself

### Authorization errors
- Make sure you're logged into the correct Google account
- Re-authorize: **Deploy** → **Manage deployments** → **Edit** → **Deploy**

---

## Data Fields

The form collects and stores:

| Field | Description | Column |
|-------|-------------|--------|
| Name | User's full name | A |
| Email | Email address | B |
| Phone | Phone number | C |
| Message | Swimming goals/message | D |
| Date | Submission timestamp (IST) | E |

---

## Exporting Data

To download as Excel:
1. Open your Google Sheet
2. Click **File** → **Download** → **Microsoft Excel (.xlsx)**

---

## Security Notes

- The Google Script URL is public but only accepts POST requests with specific data format
- No sensitive credentials are stored in the website code
- All data is stored in your personal Google account
- You control who has access to the spreadsheet

---

## Support

If you have issues:
1. Check the browser console for errors (F12 → Console)
2. Check Apps Script execution logs
3. Verify the URL is correctly copied (no extra spaces)

---

*Last updated: December 2024*
