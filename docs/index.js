var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const bookDisplay = document.querySelector(".bookDisplay");
const input = document.querySelector("input");
const overlayHeader = document.querySelector(".bookDisplay");
const h1 = document.querySelector("h1");
let articles;
let data;
const fetchingData = () => __awaiter(void 0, void 0, void 0, function* () {
    data = yield (yield fetch("https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books")).json();
    displayBooks(data, input === null || input === void 0 ? void 0 : input.value);
});
fetchingData();
// The following function takes a array of books and a string.
// If the string is empty it will show all the books but in the case the string contains characters it will compare
// to the book's title and the book's author's name then filter the results depending on the string content.
const displayBooks = (books, input) => {
    if (h1)
        h1.innerText = "8 Classic Childrens books";
    books
        .filter((book) => {
        return (book.title + book.author)
            .toLowerCase()
            .includes(input.toLowerCase());
    })
        .map((bookData) => {
        let article = articleComponent(bookData);
        article.className = "book";
        main === null || main === void 0 ? void 0 : main.append(article);
    });
    infoPageEvent();
};
// EventListeners
const infoPageEvent = () => {
    articles = document.querySelectorAll("main article");
    articles.forEach((article) => {
        article.addEventListener("click", (e) => {
            const articleData = data[parseInt(article.id) - 1];
            overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle("hidden");
            overlayHeader.append(articleComponent(articleData));
            const titleElement = document.getElementById("title");
            const authorElement = document.getElementById("author");
            const discElement = document.getElementById("disc");
            const audianceElement = document.getElementById("audiance");
            const firsPublishElement = document.getElementById("firsPublish");
            const pagesElement = document.getElementById("pages");
            const publisherElement = document.getElementById("publisher");
            if (titleElement)
                titleElement.textContent = `${articleData.title}`;
            if (authorElement)
                authorElement.textContent = `By ${articleData.author}`;
            if (discElement)
                discElement.textContent = `${articleData.plot}`;
            if (audianceElement)
                audianceElement.innerHTML = `<span>Audience: </span>${articleData.audience}`;
            if (firsPublishElement)
                firsPublishElement.innerHTML = `<span>First published: </span>${articleData.year}`;
            if (pagesElement)
                pagesElement.innerHTML = `<span>Pages: </span>${articleData.pages ? articleData.pages : "Unavailable data"}`;
            if (publisherElement)
                publisherElement.innerHTML = `<span>Publisher: </span>${articleData.publisher}`;
        });
    });
};
input.addEventListener("input", (e) => {
    const event = e.target;
    articles = document.querySelectorAll("main article");
    articles.forEach((article) => article.remove());
    displayBooks(data, event.value ? event.value : "");
});
(_a = document.querySelector(".back")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    var _a;
    (_a = bookDisplay === null || bookDisplay === void 0 ? void 0 : bookDisplay.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle("hidden");
});
const articleComponent = (bookData) => {
    let article = document.createElement("article");
    let artFooter = document.createElement("footer");
    let title = document.createElement("h4");
    let author = document.createElement("p");
    artFooter.className = "bookFooter";
    article.appendChild(artFooter);
    artFooter.appendChild(title);
    artFooter.appendChild(author);
    article.id = bookData.id.toString();
    title.innerText = bookData.title;
    author.innerText = bookData.author;
    article.style.background = `linear-gradient(45deg, ${bookData.color}, ${bookData.color}65)`;
    return article;
};
export {};
//# sourceMappingURL=index.js.map