# 📊 Google Sheets Integration Setup Guide

This guide will help you set up free Google Sheets integration to automatically collect customer registration data from your e-books website.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "E-books Orders" or similar
4. In the first row, add these headers:
   ```
   A1: Name
   B1: Phone
   C1: Items
   D1: Date
   E1: Total Amount
   ```

### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Add new row with the data
    sheet.appendRow([
      data.name,
      data.phone,
      data.items,
      new Date(data.timestamp),
      '$' + data.totalAmount.toFixed(2)
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy the Script

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Type"
3. Select **Web app**
4. Set these options:
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Copy the Web app URL** - you'll need this!

### Step 4: Update Your Website Code

1. Open `src/components/RegistrationForm.jsx`
2. Find this line:
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual Web app URL

## 🎯 How It Works

1. **Customer fills form** → Data sent to Google Apps Script
2. **Script processes data** → Automatically adds row to Google Sheets
3. **You get notification** → Real-time order tracking in Google Sheets

## 📋 Your Order Data Will Include:

- **Customer Name**
- **Phone Number** 
- **Items Ordered** (with quantities and prices)
- **Order Date/Time**
- **Total Amount**

## 🔧 Alternative: CSV Download

If you don't want to set up Google Sheets, customers can still download their order as a CSV file by clicking the "Download Order as CSV" button in the registration form.

## 📱 Mobile-Friendly

The registration form works perfectly on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones

## 🆓 Completely Free

- ✅ No monthly fees
- ✅ No backend server needed
- ✅ Uses Google's free services
- ✅ Unlimited form submissions (within Google's limits)

## 🛡️ Privacy & Security

- Data goes directly to your Google Sheet
- No third-party services involved
- You control all customer data
- HTTPS encrypted transmission

## 🚨 Troubleshooting

**If the form doesn't submit:**
1. Check that you've replaced `YOUR_SCRIPT_ID` with your actual URL
2. Make sure the Google Apps Script is deployed as "Anyone" can access
3. Check the browser console for any errors

**If you're not receiving data:**
1. Verify the Google Sheet has the correct headers
2. Check the Apps Script execution log for errors
3. Try the CSV download as an alternative

---

**🎉 You're all set!** Your e-books website now has a professional order collection system that automatically saves customer data to Google Sheets!