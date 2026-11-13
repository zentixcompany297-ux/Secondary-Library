import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// التحقق من حالة المستخدم: إذا كان مسجلاً دخول مسبقاً، حوله فوراً للصفحة الرئيسية
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace("main/main.html");
  }
});

// أكواد التحريك الأصلية
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

// 1. إنشاء حساب جديد
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    window.location.href = "main/main.html";
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert("هذا البريد الإلكتروني مسجل بالفعل! يرجى الدخول من شاشة (Sign In).");
      container.classList.remove('active'); 
    } else if (error.code === 'auth/weak-password') {
      alert("كلمة المرور ضعيفة، يجب أن تكون 6 أحرف أو أرقام على الأقل.");
    } else {
      alert("حدث خطأ: " + error.message);
    }
  }
});

// 2. تسجيل الدخول
const signinForm = document.getElementById('signin-form');
signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "main/main.html";
  } catch (error) {
    alert("البريد الإلكتروني أو كلمة المرور غير صحيحة!");
  }
});

// 3. استعادة كلمة المرور (إضافي)
const forgotBtn = document.getElementById('forgot-password');
forgotBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signin-email').value;
  if (!email) {
    alert("اكتب بريدك الإلكتروني في خانة الإيميل أولاً ثم اضغط هنا.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    alert("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
  } catch (error) {
    alert("تأكد من كتابة البريد الإلكتروني بشكل صحيح.");
  }
});