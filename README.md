# 📱 WhatsApp Bulk Sender via Baileys + XLSX 📊
Made for mass messaging memebers of Tech Club
A Node.js script to automate personalized WhatsApp messages using the [Baileys](https://github.com/WhiskeySockets/Baileys) library.  
It reads phone numbers and names from an Excel file (`Book1.xlsx`) and sends each contact a custom message through your connected WhatsApp account.

---

## 📦 Features

- 📑 **Read contacts from Excel (.xlsx)**
- 📲 **Automatically send WhatsApp messages via Baileys**
- 📝 **Customize messages with each contact's name**
- 🛡️ **Multi-file session authentication (auto reconnects)**
- 📖 **Auto-save chat and contact store to JSON**
- ⏳ **Staggered message sending with delays (to avoid rate limiting)**

---

## 📁 Project Structure

| File                      | Purpose                                          |
|:--------------------------|:------------------------------------------------|
| `Book1.xlsx`               | Excel file containing names and phone numbers   |
| `auth_info_baileys/`       | Stores authentication credentials (created after first QR scan) |
| `baileys_store.json`       | Stores chat and contact cache (auto-saved every 10 seconds) |
| `script.js` (your file)    | WhatsApp automation script using Baileys and XLSX |

---

## 📖 Excel File Format (`Book1.xlsx`)

| Name       | PhoneNumber   |
|------------|---------------|
| John Doe   | 9876543210     |
| Jane Smith | 9123456789     |

> ⚠️ **PhoneNumber should be in 10-digit format (without +91)**

---

## 📦 Dependencies

- [Baileys](https://github.com/WhiskeySockets/Baileys)
- [xlsx](https://www.npmjs.com/package/xlsx)
- `fs`

---

## 🚀 Setup & Usage

### 1️⃣ Install Dependencies

```bash
npm install @whiskeysockets/baileys xlsx
