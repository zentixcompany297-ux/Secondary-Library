// دوال فتح وإغلاق القائمة الجانبية
function openFunction() {
    document.getElementById("menu").style.width = '330px';
}

function closeFunction() {
    document.getElementById("menu").style.width = '0px';
}


// 1. مصفوفة الكتب (أضف هنا أي عدد من الكتب بنفس الشكل)
const books = [
  {
    img: "https://zentixcompany297-ux.github.io/img/1.jpg",
    name: "الكيمياء - مشاهدات علمية DK",
    description: "يقدم كتاب الكيمياء (من سلسلة مشاهدات علمية) رحلة بصرية مبسطة تستكشف تاريخ الكيمياء وتفاعلاتها في حياتنا ومستقبلنا.",
    author: "آن نيومارك"
  },
  {
    img: "https://zentixcompany297-ux.github.io/img/2.jpg",
    name: "من عجائب الخلق في جسم الإنسان",
    description: "يستعرض الكتاب أسرار ودقة تصميم أعضاء الجسم البشري ووظائفها الحيوية بأسلوب علمي مبسط، لإبراز عظمة الخالق.",
    author: "محمد إسماعيل الجاويش"
  },
  {
    img: "https://zentixcompany297-ux.github.io/img/4.jpg",
    name: "الهيكل العظمي",
    description: "يأخذك الكتاب في رحلة بصرية مدعمة بالصور الحقيقية لاستكشاف تركيب العظام ووظائفها في دعم وحماية الاجسام وتطورها مع الزمن.",
    author: "ستيف باركر"
  },
    {
    img: "https://zentixcompany297-ux.github.io/img/5.jpg",
    name: "البراكين",
    description: "يأخذك الكتاب في رحلة بصرية مثيرة لاستكشاف باطن الأرض الملتهب وأسرار تكوّن البراكين وثورانها، وتأثيرها المذهل على كوكبنا.",
    author: "ستيف باركر"
  },
];

const container = document.getElementById("books-container");
const searchInput = document.getElementById("search-input");

// 2. دالة لعرض الكتب باستخدام map
function displayBooks(booksList) {
  if (!container) return;

  // تحويل كل كتاب في المصفوفة إلى كارت HTML
  const cardsHTML = booksList.map(book => {
    return `
      <div class="card">
        <div class="head"></div>
        <img src="${book.img || 'default-image.jpg'}" alt="${book.name}" />
        <h1 class="name">${book.name}</h1>
        <span class="title">${book.description}</span>
        <small style="color: #aaa; display: block; margin: 5px 0;">المؤلف: ${book.author}</small>
      </div>
    `;
  }).join(""); // join("") مهمة جداً لإزالة الفواصل بين العناصر

  container.innerHTML = cardsHTML;
}

// 3. تشغيل الدالة لأول مرة لعرض كل الكتب عند فتح الصفحة
displayBooks(books);

// 4. ربط مربع البحث بالمصفوفة مباشرة
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase().replace(/[أإآ]/g, "ا");

    // فلترة المصفوفة بناءً على اسم الكتاب
    const filteredBooks = books.filter(book => {
      const cleanName = book.name.toLowerCase().replace(/[أإآ]/g, "ا");
      return cleanName.startsWith(query);
    });

    // إعادة رسم الكتب المطابقة فقط
    displayBooks(filteredBooks);
  });
}
