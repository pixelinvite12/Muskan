/* ===========================
   GUPTA'S ART — main.js
   =========================== */

// ── CONFIG: Change these to your actual numbers/handles ──
const WHATSAPP_NUMBER = "917860142874"; // Replace with your WhatsApp number (with country code, no +)
const INSTAGRAM_HANDLE = "pixel_invitess"; // Replace with your Instagram username

// ── Per-page prices for each service (₹) ──
const PRICES = {
  "Holiday Homework": 30,
  "Project File": 40,
  "Assignment": 25,
  "Cover Page": 50,
  "Decorative Sheet": 35,
  "Scrapbook / Poster": 80,
  "Model": 200,
};

// ── State ──
let currentService = "";
let uploadedFileName = "";

// ── Open Order Modal ──
function openOrder(serviceName) {
  currentService = serviceName;
  document.getElementById("modalServiceName").textContent = serviceName;
  document.getElementById("orderModal").classList.add("active");
  document.body.style.overflow = "hidden";

  // Reset form
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerClass").value = "";
  document.getElementById("customerSubject").value = "";
  document.getElementById("customerPages").value = "";
  document.getElementById("customerNotes").value = "";
  document.getElementById("fileText").textContent = "Click to upload image or PDF";
  document.getElementById("amountDisplay").style.display = "none";
  uploadedFileName = "";
}

// ── Close Order Modal ──
function closeOrder() {
  document.getElementById("orderModal").classList.remove("active");
  document.body.style.overflow = "";
}

// Close on overlay click
document.getElementById("orderModal").addEventListener("click", function (e) {
  if (e.target === this) closeOrder();
});

// ── Calculate Amount ──
function calculateAmount() {
  const pages = parseInt(document.getElementById("customerPages").value) || 0;
  const price = PRICES[currentService] || 30;
  if (pages > 0) {
    const total = pages * price;
    document.getElementById("estimatedAmount").textContent = "₹" + total;
    document.getElementById("amountDisplay").style.display = "block";
  } else {
    document.getElementById("amountDisplay").style.display = "none";
  }
}

// ── Handle File Upload Display ──
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    uploadedFileName = file.name;
    const maxLen = 30;
    const displayName = file.name.length > maxLen
      ? file.name.substring(0, maxLen) + "..."
      : file.name;
    document.getElementById("fileText").textContent = "📎 " + displayName;
  }
}

// ── Build Order Message ──
function buildMessage() {
  const name    = document.getElementById("customerName").value.trim();
  const phone   = document.getElementById("customerPhone").value.trim();
  const cls     = document.getElementById("customerClass").value;
  const subject = document.getElementById("customerSubject").value.trim();
  const pages   = document.getElementById("customerPages").value.trim();
  const notes   = document.getElementById("customerNotes").value.trim();

  if (!name || !phone) {
    alert("Please enter your name and phone number!");
    return null;
  }
  if (!pages || parseInt(pages) < 1) {
    alert("Please enter the number of pages / quantity!");
    return null;
  }

  const price = PRICES[currentService] || 30;
  const total = parseInt(pages) * price;

  let msg = `🎨 *Gupta's Art — New Order!*\n\n`;
  msg += `📋 *Service:* ${currentService}\n`;
  msg += `👤 *Name:* ${name}\n`;
  msg += `📞 *Phone:* ${phone}\n`;
  if (cls)     msg += `🏫 *Class:* ${cls}\n`;
  if (subject) msg += `📚 *Subject/Topic:* ${subject}\n`;
  msg += `📄 *Pages/Qty:* ${pages}\n`;
  msg += `💰 *Estimated Amount:* ₹${total} (₹${price}/page)\n`;
  if (uploadedFileName) msg += `📎 *File Attached:* ${uploadedFileName}\n`;
  if (notes) msg += `📝 *Notes:* ${notes}\n`;
  msg += `\n✅ Please confirm availability and final price. Thank you!`;

  return msg;
}

// ── Send via WhatsApp ──
function sendToWhatsApp() {
  const msg = buildMessage();
  if (!msg) return;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
  closeOrder();
  showSuccessToast("Opening WhatsApp... 🎉");
}

// ── Send via Instagram ──
function sendToInstagram() {
  const msg = buildMessage();
  if (!msg) return;
  // Instagram DM doesn't support pre-filled messages from URL
  // So we copy the message and open Instagram
  try {
    navigator.clipboard.writeText(msg).then(() => {
      alert("✅ Order details copied!\nOpening Instagram — paste the message in DM to @" + INSTAGRAM_HANDLE);
    });
  } catch (e) {
    // Fallback: prompt
    prompt("Copy this message and DM it on Instagram:", msg);
  }
  const url = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
  window.open(url, "_blank");
  closeOrder();
}

// ── Toast Notification ──
function showSuccessToast(text) {
  const toast = document.createElement("div");
  toast.textContent = text;
  toast.style.cssText = `
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: #25d366; color: #fff; padding: 0.8rem 1.8rem;
    border-radius: 50px; font-weight: 700; font-family: 'Nunito', sans-serif;
    font-size: 0.95rem; box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    z-index: 9999; animation: toastIn 0.3s ease;
  `;
  document.head.insertAdjacentHTML("beforeend", `
    <style>@keyframes toastIn {
      from { opacity:0; transform: translateX(-50%) translateY(20px); }
      to { opacity:1; transform: translateX(-50%) translateY(0); }
    }</style>
  `);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ── Hamburger Menu ──
const hamburger = document.getElementById("hamburger");
const navLinks  = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.style.display === "flex";
  navLinks.style.cssText = isOpen
    ? ""
    : `display:flex; flex-direction:column; position:absolute; top:70px; left:0; right:0;
       background:#1a1a2e; padding:1.5rem; gap:1rem; box-shadow:0 8px 24px rgba(0,0,0,0.3); z-index:99;`;
});

// ── Scroll animations ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".service-card, .step").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});
