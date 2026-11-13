// تعريف المتغيرات الأساسية للسلايدر
const slides = document.querySelectorAll('.slide'); 
let currentIndex = 0;

function nextSlide() {
    // التحقق من وجود صور لتجنب الأخطاء
    if (slides.length === 0) return;

    // إزالة الكلاس active من الصورة الحالية لتختفي
    slides[currentIndex].classList.remove('active');

    // الانتقال للصورة التالية (والعودة للبداية عند الوصول للأخيرة)
    currentIndex = (currentIndex + 1) % slides.length;

    // إضافة الكلاس active للصورة الجديدة لتظهر
    slides[currentIndex].classList.add('active');
}

// تغيير الصورة كل 8 ثوانٍ (8000 ميللي ثانية)
setInterval(nextSlide, 8000);

// دوال فتح وإغلاق القائمة الجانبية
function openFunction() {
    document.getElementById("menu").style.width = '330px';
}

function closeFunction() {
    document.getElementById("menu").style.width = '0px';
}


// ==========================================
// 🔍 ميزة البحث الفوري (الذكية للغة العربية)
// ==========================================
const searchInput = document.getElementById("search-input");

// دالة لتوحيد الحروف العربية (إزالة التشكيل وتوحيد الهمزات والتاء المربوطة)
function normalizeArabic(text) {
    return text
        .toLowerCase()
        .replace(/[\u064B-\u065F]/g, '') // إزالة التشكيل
        .replace(/[أإآ]/g, 'ا')          // توحيد الألفات
        .replace(/ى/g, 'ي')              // توحيد الياء والألف المقصورة
        .replace(/ؤ/g, 'ء')
        .replace(/ئ/g, 'ء')
        .replace(/ة/g, 'ه')              // توحيد التاء المربوطة والهاء
        .trim();
}

if (searchInput) {
    searchInput.addEventListener("input", function(e) {
        // تقسيم جملة البحث إلى كلمات منفصلة للبحث بدقة أكبر
        const queryWords = normalizeArabic(e.target.value).split(/\s+/).filter(Boolean);
        const cards = document.querySelectorAll('.sections .card');

        cards.forEach(card => {
            // قراءة نص الكارت ومعالجته ليتطابق مع البحث
            const cardText = normalizeArabic(card.textContent);

            // التحقق مما إذا كانت كل كلمات البحث موجودة داخل الكارت
            const isMatch = queryWords.every(word => cardText.includes(word));

            // إظهار أو إخفاء الكارت بناءً على المطابقة
            card.style.display = isMatch ? "flex" : "none";
        });
    });
}