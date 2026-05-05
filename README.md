# 🎨 Gupta's Art — Website

A beautiful, mobile-friendly website for handcrafted homework & creative services.

## 📁 File Structure

```
guptas-art/
├── index.html        ← Main website page
├── css/
│   └── style.css     ← All styling
├── js/
│   └── main.js       ← Order logic, WhatsApp/Instagram integration
└── README.md
```

## ⚙️ Setup — Change Your Details

Before hosting, open `js/main.js` and update these 2 lines:

```js
const WHATSAPP_NUMBER = "917860142874"; // ← Your WhatsApp number (91 + 10 digits)
const INSTAGRAM_HANDLE = "pixel_invitess"; // ← Your Instagram username
```

Also update the footer links in `index.html`:
- Search for `wa.me/917860142874` → replace with your number
- Search for `https://www.instagram.com/pixel_invitess/` → replace with your handle

## 🚀 Deploy on GitHub Pages (Free Hosting)

1. Create a new repository on GitHub (e.g. `guptas-art`)
2. Upload all files keeping the folder structure intact
3. Go to **Settings → Pages**
4. Under "Source", select `main` branch → `/root` folder → Save
5. Your site will be live at: `https://yourusername.github.io/guptas-art/`

## 💰 Pricing (Edit in main.js)

```js
const PRICES = {
  "Holiday Homework": 30,    // ₹ per page
  "Project File": 40,
  "Assignment": 25,
  "Cover Page": 50,
  "Decorative Sheet": 35,
  "Scrapbook / Poster": 80,
  "Model": 200,
};
```

## 📱 How Orders Work

1. Customer taps a service card
2. Fills in their name, phone, subject, pages
3. Optionally uploads assignment image/PDF
4. Taps **"Send via WhatsApp"** → Opens WhatsApp with pre-filled order message
5. OR taps **"Send via Instagram"** → Copies message + opens your Instagram

Made with ❤️ for Gupta's Art
