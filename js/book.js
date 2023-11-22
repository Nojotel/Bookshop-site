const category = document.querySelectorAll(".category__item");
const buttonLoad = document.querySelector(".button__load-more");
const containerBooks = document.querySelector(".book-container__books");
let nextLoadCategory = "";
let querySubject = "subject:Architecture";
let startIndex = 0;
let allBooks = [];
let cartBook = [];
let buttonBuy = "";
initializeCart();
resultRequest();
//выбрать класс
function toggleCategoryBooks() {
  category.forEach((item) => {
    item.addEventListener("click", (event) => {
      let targetCategory = event.target.closest(".category__item");
      removeActiveCategory();
      targetCategory.classList.add("active");
      if (item.classList.contains("active")) {
        nextLoadCategory = item.innerText;
      }
      containerBooks.innerHTML = "";

      updateButtonStatus();

      querySubject = `subject:${nextLoadCategory}`;
      resultRequest();
      allBooks = [];
    });
  });
}
//Еще книги
function nextLoadBooks() {
  buttonLoad.addEventListener("click", () => {
    startIndex += 6;
    nextLoadCategory = document.querySelector(".category__item.active")?.innerText || "";
    querySubject = `subject:${nextLoadCategory}`;
    resultRequest();
  });
}
nextLoadBooks();
//убрать активный класс
function removeActiveCategory() {
  category.forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });
}
toggleCategoryBooks();
//запром
function initRequest() {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${querySubject}&key=AIzaSyCW0_gLZKAuIyp-shHr9621LFy_zXDskuY&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
    .then((response) => {
      const result = response.json();
      return result;
    })
    .then((data) => {
      return data;
    })
    .catch(() => {
      console.log("error");
    });
}

async function resultRequest() {
  const data = await initRequest();
  const dataItems = data.items;
  drawBooks(dataItems);
  allBooks.push(dataItems);
  addCart();
  updateButtonStatus();
}
let buttonText = "buy now";
//вывод кнмг
function drawBooks(booksItems) {
  booksItems.forEach((item) => {
    let books = `<div class="book-container__books_wrap">
                  <img onerror="this.src='../img/picture.png'" class="${item.volumeInfo?.imageLinks?.thumbnail ? "books_wrap-image" : "books_wrap-image_error"}" src="${item.volumeInfo?.imageLinks?.thumbnail}" alt="Обложка">
                  <div class="books_wrap-info">
                    <div class="books_wrap-info_author">${item.volumeInfo?.authors}</div>
                    <h2 class="books_wrap-info_title">${item.volumeInfo?.title}</h2>
                    
                    <div class="${item.volumeInfo?.averageRating ? "books_wrap-rating_block" : "books_wrap-rating_block_error"}">
                                  <div class="${item.volumeInfo?.averageRating ? "rating_block_stars" : "none"}">   
                                      <div class="${item.volumeInfo?.averageRating === 1 ? "rating_block_stars__one" : "none"}">
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__grey"></div>
                                          <div class="rating_block_stars__grey"></div>
                                          <div class="rating_block_stars__grey"></div>
                                          <div class="rating_block_stars__grey"></div>
                                      </div>
                                      <div class="${item.volumeInfo?.averageRating === 2 ? "rating_block_stars__two" : "none"}">
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__grey"></div>
                                          <div class="rating_block_stars__grey"></div>
                                          <div class="rating_block_stars__grey"></div>
                                      </div>
                                      <div class="${item.volumeInfo?.averageRating === 3 ? "rating_block_stars__three" : "none"}">
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__grey"></div>
                                          <div class="rating_block_stars__grey"></div>
                                      </div>
                                      <div class="${item.volumeInfo?.averageRating === 4 ? "rating_block_stars__four" : "none"}">
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__grey"></div>
                                      </div>
                                      <div class="${item.volumeInfo?.averageRating === 5 ? "rating_block_stars__five" : "none"}">
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                          <div class="rating_block_stars__yellow"></div>
                                      </div>
                                  </div>
                                  <div class="${item.volumeInfo?.ratingsCount ? "books_wrap-rating" : "books_wrap-rating_error"}">${item.volumeInfo?.ratingsCount} review</div>
                              </div>
                              
                    <p class="${item.volumeInfo?.description ? "books_wrap-info_description" : "books_wrap-info_description_error"}">${item.volumeInfo?.description}</p>
                    <div class="${item.saleInfo?.retailPrice?.amount ? "books_wrap-info_sale" : "books_wrap-info_sale_error"}">&#36; ${item.saleInfo?.retailPrice?.amount}</div>
                    <button class="button_buy-now" type="button" data-btnbuy="${item.id}">${buttonText}</button>
                  </div>
                </div>`;
    containerBooks.innerHTML += books;
    console.log(item.volumeInfo?.averageRating);
  });
}
//В корзину книгу
function addCart() {
  let buttonBuyNow = document.querySelectorAll(".button_buy-now");
  buttonBuyNow.forEach((item) => {
    item.addEventListener("click", (event) => {
      let countBook = document.querySelector(".button-container__button-quantity");
      buttonBuy = event.target.closest(".button_buy-now");
      buttonBuy.classList.toggle("button_in-the-cart");
      if (buttonBuy.classList.contains("button_in-the-cart")) {
        buttonBuy.innerText = "In the cart";
        saveBooks(event);
        countBook.innerText = cartBook.length;
      } else {
        buttonBuy.innerText = "buy now";
        removeBooks(event);
        countBook.innerText = cartBook.length;
      }
      updateButtonStatus();
    });
  });
}
function removeBooks(ev) {
  for (let i = 0; i < allBooks.length; i++) {
    let resultForremove = allBooks[i];
    resultForremove.forEach((item) => {
      id = item.id;
      if (id == ev.target.dataset.btnbuy) {
        cartBook.forEach((item, index) => {
          if (item.id == id) {
            cartBook.splice(index, 1);
          }
        });
        localStorage.setItem("bagBook", JSON.stringify(cartBook));
      }
    });
  }
}

function saveBooks(ev) {
  if (!ev.target.dataset.btnbuy) {
    return;
  }
  for (let i = 0; i < allBooks.length; i++) {
    let resultForadd = allBooks[i];
    resultForadd.forEach((item) => {
      id = item.id;
      if (id == ev.target.dataset.btnbuy) {
        let found = resultForadd.find((element) => element.id === id);
        cartBook.push(found);
        localStorage.setItem("bagBook", JSON.stringify(cartBook));
      }
    });
  }
}
function initializeCart() {
  const storedCart = localStorage.getItem("bagBook");
  if (storedCart) {
    cartBook = JSON.parse(storedCart);
    updateCartQuantityDisplay();

    updateButtonStatus();
  }
}

function updateButtonStatus() {
  const isInCart = (bookId) => cartBook.some((item) => item.id === bookId);

  document.querySelectorAll(".button_buy-now").forEach((button) => {
    const bookId = button.dataset.btnbuy;
    button.classList.toggle("button_in-the-cart", isInCart(bookId));
    button.innerText = isInCart(bookId) ? "In the cart" : "buy now";
  });
}

function updateCartQuantityDisplay() {
  document.querySelector(".button-container__button-quantity").innerText = cartBook.length;
}
