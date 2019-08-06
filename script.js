let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    this.info = [title, author, pages, readStatus]
}

Book.prototype.addBook = function addBookToLibrary() {
    myLibrary.push(this.info);
}