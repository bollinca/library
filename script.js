let myLibrary = [['hello', 'test', 123, 'no'], [1, 2, 3, 4], [5, 1, 6, 2], [52, 15, 15, 61]];

function renderAll(library) {
    for (let i = 0; i < library.length; i++) {
        render(library[i]);
    }
}

function render(book) {
    let newCard = document.createElement('div');
    let cardTitle = document.createElement('h2')
    let cardAuthor = document.createElement('p')
    let cardPages = document.createElement('p')
    let cardStatus = document.createElement('p')
    newCard.classList.add('card');
    newCard.appendChild(cardTitle);
    newCard.appendChild(cardAuthor);
    newCard.appendChild(cardPages);
    newCard.appendChild(cardStatus);
    cardTitle.textContent = book[0];
    cardAuthor.textContent = `Author: ${book[1]}`;
    cardPages.textContent = `Page Count: ${book[2]}`;
    cardStatus.textContent = `Finished?: ${book[3]}`;
    cardContainer.appendChild(newCard);
}

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    this.info = [this.title, this.author, this.pages, this.readStatus];
}

Book.prototype.addBook = function addBookToLibrary() {
    myLibrary.push(this.info);
}

function showForm() {
    newBookForm.classList.toggle('invisible')
}

const newBookForm = document.querySelector('#new-book-form');
const newBookButton = document.querySelector('#new-book-button');
const cardContainer = document.querySelector('#card-container');
newBookButton.addEventListener('click', showForm);

renderAll(myLibrary);