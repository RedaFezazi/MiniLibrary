import { Book } from "./interfaces";
const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const bookDisplay = document.querySelector(".bookDisplay");
const input = document.querySelector("input") as HTMLInputElement;
const overlayHeader = document.querySelector(".bookDisplay") as HTMLElement;
const h1 = document.querySelector("h1");
let articles: NodeListOf<HTMLElement>;
let data: Book[];

const fetchingData = async () => {
  data = await (
    await fetch(
      "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"
    )
  ).json();

  displayBooks(data, input?.value);
};
fetchingData();

// The following function takes a array of books and a string.
// If the string is empty it will show all the books but in the case the string contains characters it will compare
// to the book's title and the book's author's name then filter the results depending on the string content.
const displayBooks = (books: Book[], input: string) => {
  if (h1) h1.innerText = "8 Classic Childrens books";

  books
    .filter((book) => {
      return (book.title + book.author)
        .toLowerCase()
        .includes(input.toLowerCase());
    })
    .map((bookData) => {
      let article = articleComponent(bookData);
      article.className = "book";
      main?.append(article);
    });

  infoPageEvent();
};

// EventListeners

const infoPageEvent = () => {
  articles = document.querySelectorAll("main article");

  articles.forEach((article) => {
    article.addEventListener("click", (e) => {
      const articleData = data[parseInt(article.id) - 1];
      overlay?.classList.toggle("hidden");

      overlayHeader.append(articleComponent(articleData));

      const titleElement = document.getElementById(
        "title"
      ) as HTMLHeadingElement;
      const authorElement = document.getElementById(
        "author"
      ) as HTMLParagraphElement;
      const discElement = document.getElementById(
        "disc"
      ) as HTMLParagraphElement;
      const audianceElement = document.getElementById(
        "audiance"
      ) as HTMLParagraphElement;
      const firsPublishElement = document.getElementById(
        "firsPublish"
      ) as HTMLParagraphElement;
      const pagesElement = document.getElementById(
        "pages"
      ) as HTMLParagraphElement;
      const publisherElement = document.getElementById(
        "publisher"
      ) as HTMLParagraphElement;

      if (titleElement) titleElement.textContent = `${articleData.title}`;
      if (authorElement) authorElement.textContent = `By ${articleData.author}`;
      if (discElement) discElement.textContent = `${articleData.plot}`;
      if (audianceElement)
        audianceElement.innerHTML = `<span>Audience: </span>${articleData.audience}`;
      if (firsPublishElement)
        firsPublishElement.innerHTML = `<span>First published: </span>${articleData.year}`;
      if (pagesElement)
        pagesElement.innerHTML = `<span>Pages: </span>${
          articleData.pages ? articleData.pages : "Unavailable data"
        }`;
      if (publisherElement)
        publisherElement.innerHTML = `<span>Publisher: </span>${articleData.publisher}`;
    });
  });
};

input.addEventListener("input", (e) => {
  const event = e.target as HTMLInputElement;
  articles = document.querySelectorAll("main article");
  articles.forEach((article) => article.remove());
  displayBooks(data, event.value ? event.value : "");
});

document.querySelector(".back")?.addEventListener("click", (e) => {
  bookDisplay?.firstChild?.remove();
  overlay?.classList.toggle("hidden");
});

const articleComponent = (bookData: Book) => {
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
