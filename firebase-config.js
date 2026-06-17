// =============================================
// ZENTRA - Shared Firebase Config
// EDIT FILE INI SAJA untuk connect kedua app
// =============================================
//
// Cara dapat config:
// 1. Firebase Console → Project Settings → Your Apps → Web
// 2. Copy firebaseConfig
// 3. Paste di bawah
//
// Login Zentra Control:
//   Email    : owner@zentra.app
//   Password : ZentraOwner2026!

// Proxy URL setelah deploy zentra-proxy ke Vercel
// Contoh: https://zentra-proxy.vercel.appwindow.ZENTRA_PROXY_URL = 'https://GANTI-PROXY-URL.vercel.app';

window.ZENTRA_FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBY5t3V7gWZQFhEv23aI3hEoV8PyTm6YoU",
  authDomain:        "control-zentra.firebaseapp.com",
  projectId:         "control-zentra",
  storageBucket:     "control-zentra.firebasestorage.app",
  messagingSenderId: "716315303074",
  appId:             "1:716315303074:web:500bd49b84b60639740bfb"
};
