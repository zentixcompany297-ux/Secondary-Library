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
    img: "https://zentixcompany297-ux.github.io/img/6.jpg",
    name: "الآلات الطائرة",
    description: "استكشاف عالم الآلات الطائرة وتطبيقاتها في الحياة اليومية، مع التركيز على التطورات التكنولوجية والابتكارات الحديثة.",
    author: "أندرو ناهوم"
  },
  {
    img: "https://zentixcompany297-ux.github.io/img/8.jpg",
    name: "الصواريخ والقذائف الموجهة",
    description: "استكشاف عالم الصواريخ والقذائف الموجهة وتطبيقاتها في الحياة اليومية، مع التركيز على التطورات التكنولوجية والابتكارات الحديثة.",
    author: " كلايتون نايت"
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
