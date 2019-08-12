let myLibrary = [new Book('hello', 'test', 123, 'no'), new Book(1, 2, 3, 4), new Book(5, 1, 6, 2), new Book(52, 15, 15, 61)];

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
    newCard.appendChild(cardTitle);
    newCard.appendChild(cardAuthor);
    newCard.appendChild(cardPages);
    newCard.appendChild(cardStatus);

    cardTitle.textContent = book.title;
    cardAuthor.textContent = `Author: ${book.author}`;
    cardPages.textContent = `Page Count: ${book.pages}`;
    cardStatus.textContent = `Finished?: ${book.readStatus}`;
    
    newCard.classList.add('card');
    cardContainer.appendChild(newCard);
}

function submitForm() {
    const newBook = new Book(bookForm[0].value, bookForm[1].value, bookForm[2].value, findCheckedRadio());
    console.log(typeof newBook);
    render(newBook);
    clearForm();
}

function findCheckedRadio() {
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value
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
    bookForm.classList.toggle('invisible')
}
    
const bookForm = document.querySelector('#new-book-form');
const radioButtons = document.querySelectorAll('.radio')
const newBookButton = document.querySelector('#new-book-button');
const cardContainer = document.querySelector('#card-container');
const submitButton = document.querySelector('#add-button')

newBookButton.addEventListener('click', toggleForm);
submitButton.addEventListener('click', () => submitForm());

renderAll(myLibrary);