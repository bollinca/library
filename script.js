let myLibrary = [];

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

Book.prototype.toggleRead = function toggle(e) {
    let currentTarget = e.target.attributes['data-index'].value;
    let toggleArray = Array.from(document.querySelectorAll('.toggle'));;
    console.log(currentTarget);
    if (this.readStatus === 'no') {
        this.readStatus = 'yes';
        toggleArray[currentTarget].textContent = 'yes'
    } else {
        this.readStatus = 'no';
        toggleArray[currentTarget].textContent = 'no';
    }
    this.updateInfo();
    console.log(this.readStatus);
}

Book.prototype.addBook = function addBookToLibrary() {
    myLibrary.push(this);
}

function renderAll(library) {
    for (let i = 0; i < library.length; i++) {
        alwaysRender(library[i]);
    }
}

function renderSelective(book) {
    if (!(myLibrary.some(eachBook => areIdentical(book, eachBook)))) {
        book.addBook();
        alwaysRender(book);
    } else {
        alert('Books are identical, will not be added');
    }
}

function alwaysRender(book) {
        let newCard = document.createElement('div');
        let cardTitle = document.createElement('h2');
        let cardAuthor = document.createElement('p');
        let cardPages = document.createElement('p');
        let cardStatus = document.createElement('button');
        let deleteButton = document.createElement('button');
        newCard.appendChild(cardTitle);
        newCard.appendChild(cardAuthor);
        newCard.appendChild(cardPages);
        newCard.appendChild(cardStatus);
        newCard.appendChild(deleteButton);

        newCard.setAttribute('data-index', myLibrary.indexOf(book));
        deleteButton.setAttribute('data-index', myLibrary.indexOf(book));
        cardStatus.setAttribute('data-index', myLibrary.indexOf(book));
        cardTitle.textContent = book.title;
        cardAuthor.textContent = `Author: ${book.author}`;
        cardPages.textContent = `Page Count: ${book.pages}`;
        cardStatus.textContent = `${book.readStatus}`;
        deleteButton.textContent = 'X';

        newCard.classList.add('card');
        cardStatus.classList.add('toggle')
        deleteButton.classList.add('delete');
        cardContainer.appendChild(newCard);
        deleteButton.addEventListener('click', (e) => removeBook(e));
        cardStatus.addEventListener('click', (e) => myLibrary[e.target.attributes['data-index'].value].toggleRead(e));

}

function areIdentical(book1, book2) {
    if (book1.info.toString() === book2.info.toString()) {
        return true
    }
    return false
}

function submitForm() {
    const newBook = new Book(bookForm[0].value, bookForm[1].value, bookForm[2].value, findCheckedRadio());
    renderSelective(newBook);
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

function removeAll() {
    let deleteThisMany = cardContainer.childNodes.length;
    for (let i = 0; i < deleteThisMany; i++) {
        cardContainer.removeChild(cardContainer.childNodes[0]);
    }
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
    removeAll();
    renderAll(myLibrary);
}

const bookForm = document.querySelector('#new-book-form');
const radioButtons = document.querySelectorAll('.radio')
const newBookButton = document.querySelector('#new-book-button');
const cardContainer = document.querySelector('#card-container');
const submitButton = document.querySelector('#add-button')

newBookButton.addEventListener('click', toggleForm);
submitButton.addEventListener('click', () => submitForm());

myLibrary = [new Book('hello', 'test', 123, 'no'), new Book('A photo a day', 'Some dude', 365, 'yes'), new Book("Uh oh!", 'The Pantaloon Man', '89', 'no'), new Book('Death of a dying dead man', 'mr. yay', 15, 'yes')];
renderAll(myLibrary);