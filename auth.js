import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTZaySF7vGMRh04jCgPaOmJ9Am-GaBwbM",
  authDomain: "secondary-library-eea9c.firebaseapp.com",
  projectId: "secondary-library-eea9c",
  storageBucket: "secondary-library-eea9c.firebasestorage.app",
  messagingSenderId: "590291270869",
  appId: "1:590291270869:web:d3244c5d7d35583adbf65c",
  measurementId: "G-W0GKQSJQFL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// حماية الصفحة: طرد المستخدم إذا لم يكن مسجلاً دخول
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("../index.html");
  }
});

// تفعيل زر تسجيل الخروج
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.replace("../index.html"); // العودة مجلد للخلف للوصول لصفحة تسجيل الدخول الرئيسية
    } catch (error) {
      alert("حدث خطأ أثناء تسجيل الخروج: " + error.message);
    }
  });
}