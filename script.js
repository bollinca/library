function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    this.info = [this.title, this.author, this.pages, this.readStatus];
}

Book.prototype.updateInfo = function newInfo() {
    this.info = [this.title, this.author, this.pages, this.readStatus];
}

Book.prototype.addBook = function addBookToLibrary() {
    myLibrary.push(this);
    updateStorage();
}

Book.prototype.toggleRead = function toggle(e) {
    if (this.readStatus === 'no') {
        this.readStatus = 'yes';
    } else {
        this.readStatus = 'no';
    }
    e.target.classList.toggle('read');
    this.updateInfo();
}

function alwaysRender(book) {
    let newCard = document.createElement('div');
    newCard.setAttribute('data-index', myLibrary.indexOf(book));
    newCard.classList.add('card');

    let cardTitle = document.createElement('h2');
    cardTitle.textContent = book.title;

    let cardAuthor = document.createElement('p');
    cardAuthor.textContent = `Author: ${book.author}`;

    let cardPages = document.createElement('p');
    cardPages.textContent = `Page Count: ${book.pages}`;

    let cardStatus = document.createElement('button');
    cardStatus.setAttribute('data-index', myLibrary.indexOf(book));
    cardStatus.classList.add('toggle')
    if (book.readStatus === 'yes') {
        cardStatus.classList.add('read');
    }
    cardStatus.addEventListener('click', (e) => (myLibrary[e.target.attributes['data-index'].value]).toggleRead(e));

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.setAttribute('data-index', myLibrary.indexOf(book));
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', (e) => removeBook(e));

    newCard.appendChild(cardTitle);
    newCard.appendChild(cardAuthor);
    newCard.appendChild(cardPages);
    newCard.appendChild(cardStatus);
    newCard.appendChild(deleteButton);
    cardContainer.appendChild(newCard);
}

function renderAll(library) {
    for (let i = 0; i < library.length; i++) {
        alwaysRender(library[i]);
    }
}

function renderNew(book) {
    if (!(myLibrary.some(eachBook => areIdentical(book, eachBook)))) {
        book.addBook();
        alwaysRender(book);
    } else {
        alert('Books are identical, will not be added');
    }
}

function areIdentical(book1, book2) {
    if (book1.info.toString() === book2.info.toString()) {
        return true;
    }
    return false;
}


function submitForm() {
    const newBook = new Book(bookForm[0].value, bookForm[1].value, bookForm[2].value, findCheckedRadio());
    renderNew(newBook);
    clearForm();
}

function findCheckedRadio() {
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
}

function clearForm() {
    bookForm[0].value = '';
    bookForm[1].value = '';
    bookForm[2].value = '';
    bookForm.status.value = 'yes';
    toggleForm();
}

function toggleForm() {
    bookForm.classList.toggle('invisible');
}

function removeBook(e) {
    let deleteConfirm;
    let deleteSelector = e.target.attributes['data-index'].value;
    let allBooks = Array.from(document.querySelectorAll('.card'));
    for (let i = 0; i < allBooks.length; i++) {
        if (allBooks[i].attributes['data-index'].value === deleteSelector) {
            deleteConfirm = allBooks[i].attributes['data-index'].value;
        }
        if (deleteConfirm === deleteSelector) {
            myLibrary.splice(i, 1);
            (allBooks[i].parentNode.removeChild(allBooks[i]));
            break;
        }
    }
    updateStorage();
    removeAll();
    renderAll(myLibrary);
}

function removeAll() {
    let deletionTotal = cardContainer.childNodes.length;
    for (let i = 0; i < deletionTotal; i++) {
        cardContainer.removeChild(cardContainer.childNodes[0]);
    }
}

function checkStorage() {
    if (localStorage.storedLibrary && localStorage.storedLibrary.length > 1) {
        return 1;
    } else {
        return 0;
    }
}

function updateStorage() {
    localStorage.setItem('storedLibrary', JSON.stringify(myLibrary));
}

let myLibrary = [];
let bookForm = document.querySelector('#new-book-form');
const radioButtons = document.querySelectorAll('.radio');
const newBookButton = Array.from(document.querySelectorAll('.new-book-button'));
const cardContainer = document.querySelector('#card-container');
const submitButton = document.querySelector('#add-button');

newBookButton.forEach(button => button.addEventListener('click', toggleForm));
submitButton.addEventListener('click', () => submitForm());


if (checkStorage() === 0) {
    myLibrary = [new Book('hello', 'test', 123, 'no'), new Book('A photo a day', 'Some dude', 365, 'yes'), new Book("Uh oh!", 'The Pantaloon Man', '89', 'no'), new Book('Death of a dying dead man', 'mr. yay', 15, 'yes')];
} else if (checkStorage() === 1) {
    myLibrary = JSON.parse(localStorage.getItem('storedLibrary'));
}

renderAll(myLibrary);