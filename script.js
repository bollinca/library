let myLibrary = [];

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

const cardContainer = document.querySelector('#card-container');
function render(book) {
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.textContent = book.join(' ');
    cardContainer.appendChild(newCard);
}