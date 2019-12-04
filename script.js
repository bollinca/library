let myLibrary = []
const bookForm = document.querySelector('#new-book-form')
const radioButtons = document.querySelectorAll('.radio')
const newBookButton = Array.from(document.querySelectorAll('.new-book-button'))
const buttonCloseForm = document.querySelector('.button-close-form')
const cardContainer = document.querySelector('#card-container')
const submitButton = document.querySelector('#add-button')
const storageClearButton = document.querySelector('#storage-button')

class Book {
  constructor (title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
    this.info = [this.title, this.author, this.pages, this.readStatus]
  }

  updateInfo () {
    this.info = [this.title, this.author, this.pages, this.readStatus]
  }

  addBook () {
    myLibrary.push(this)
    updateStorage()
  }

  toggleRead (e) {
    if (this.readStatus === 'no') {
      this.readStatus = 'yes'
    } else {
      this.readStatus = 'no'
    }
    e.target.classList.toggle('read')
    this.updateInfo()
    updateStorage()
  }
}

function alwaysRender (book) {
  const newCard = document.createElement('div')
  newCard.setAttribute('data-index', myLibrary.indexOf(book))
  newCard.classList.add('card')

  const cardTitle = document.createElement('h2')
  cardTitle.textContent = book.title

  const cardAuthor = document.createElement('p')
  cardAuthor.textContent = `Author: ${book.author}`

  const cardPages = document.createElement('p')
  cardPages.textContent = `Page Count: ${book.pages}`

  const cardStatus = document.createElement('button')
  cardStatus.setAttribute('data-index', myLibrary.indexOf(book))
  cardStatus.classList.add('toggle')
  if (book.readStatus === 'yes') {
    cardStatus.classList.add('read')
  }
  cardStatus.addEventListener('click', (e) => (myLibrary[e.target.attributes['data-index'].value]).toggleRead(e))

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'X'
  deleteButton.setAttribute('data-index', myLibrary.indexOf(book))
  deleteButton.classList.add('delete')
  deleteButton.addEventListener('click', (e) => removeBook(e))

  newCard.appendChild(cardTitle)
  newCard.appendChild(cardAuthor)
  newCard.appendChild(cardPages)
  newCard.appendChild(cardStatus)
  newCard.appendChild(deleteButton)
  cardContainer.appendChild(newCard)
}

const formSubmitter = {
  newBook: {},
  formFields: {
    title: bookForm[0],
    author: bookForm[1],
    pages: bookForm[2]
  },

  submitForm: function () {
    if (this.titleValidity() === true &&
      this.authorValidity() === true &&
      this.pagesValidity() === true) {
      this.updateNewBook()
      renderNew(this.newBook)
      clearForm()
    }
  },

  setValidityListeners: function () {
    this.formFields.title.addEventListener('input', () => {
      this.formFields.title.setCustomValidity('')
      if (this.titleValidity() !== true) {
        this.formFields.title.setCustomValidity('Please enter a title.')
      }
    })
    this.formFields.author.addEventListener('input', () => {
      this.formFields.author.setCustomValidity('')
      if (this.authorValidity() !== true) {
        this.formFields.author.setCustomValidity('Please enter the author\'s name')
      }
    })
    this.formFields.pages.addEventListener('input', () => {
      this.formFields.pages.setCustomValidity('')
      if (this.pagesValidity() !== true) {
        this.formFields.pages.setCustomValidity('No larger than five digits, only using numerals 0-9')
      }
    })
  },

  titleValidity: function () {
    return this.formFields.title.checkValidity()
  },
  authorValidity: function () {
    return this.formFields.author.checkValidity()
  },
  pagesValidity: function () {
    return this.formFields.pages.checkValidity()
  },
  updateNewBook: function () {
    this.newBook = new Book(bookForm[0].value.trim(), bookForm[1].value.trim(), bookForm[2].value.trim(), findCheckedRadio())
  }
}

function findCheckedRadio () {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value
    }
  }
}

function clearForm () {
  bookForm[0].value = ''
  bookForm[1].value = ''
  bookForm[2].value = ''
  bookForm.status.value = 'yes'
  toggleForm()
}

function renderNew (book) {
  if (!(myLibrary.some(eachBook => areIdentical(book, eachBook)))) {
    book.addBook()
    alwaysRender(book)
  } else {
    window.alert('Books are identical, will not be added')
  }
}

function areIdentical (book1, book2) {
  return (book1.info.toString() === book2.info.toString())
}

function toggleForm () {
  bookForm.classList.toggle('invisible')
}

function removeBook (e) {
  let deleteConfirm
  const deleteSelector = e.target.attributes['data-index'].value
  const allBooks = Array.from(document.querySelectorAll('.card'))
  for (let i = 0; i < allBooks.length; i++) {
    if (allBooks[i].attributes['data-index'].value === deleteSelector) {
      deleteConfirm = allBooks[i].attributes['data-index'].value
    }
    if (deleteConfirm === deleteSelector) {
      myLibrary.splice(i, 1);
      (allBooks[i].parentNode.removeChild(allBooks[i]))
      break
    }
  }
  updateStorage()
  removeAll()
  renderAll(myLibrary)
}

function removeAll () {
  const deletionTotal = cardContainer.childNodes.length
  for (let i = 0; i < deletionTotal; i++) {
    cardContainer.removeChild(cardContainer.childNodes[0])
  }
}

function renderAll (library) {
  for (let i = 0; i < library.length; i++) {
    alwaysRender(library[i])
  }
}

function clearStorage () {
  const message = 'Click "OK" to revert entire library to default, demonstration books.'
  if (window.confirm(message) === true) {
    window.localStorage.clear()
    removeAll()
    toggleForm()
    clearForm()
    myLibrary = [new Book('Demo', 'J.K. Fakerson', 243, 'no'), new Book('A photo a day', 'Mr Lenz de Kamera', 365, 'yes')]
    renderAll(myLibrary)
    updateStorage()
  }
}

function checkStorage () {
  return (window.localStorage.storedLibrary && window.localStorage.storedLibrary.length > 1)
}

function updateStorage () {
  window.localStorage.setItem('storedLibrary', JSON.stringify(myLibrary))
}

newBookButton.forEach(button => button.addEventListener('click', () => toggleForm()))
buttonCloseForm.addEventListener('click', () => {
  clearForm()
})
submitButton.addEventListener('click', () => formSubmitter.submitForm())
storageClearButton.addEventListener('click', () => clearStorage())

if (checkStorage() === false) {
  myLibrary = [new Book('Demo', 'J.K. Fakerson', 243, 'no'), new Book('A photo a day', 'Mr Lenz de Kamera', 365, 'yes')]
} else if (checkStorage() === true) {
  myLibrary = JSON.parse(window.localStorage.getItem('storedLibrary'))
  const tempLibrary = myLibrary.map(book => Object.values(book))
  myLibrary = tempLibrary.map(book => new Book(...book))
}

renderAll(myLibrary)
formSubmitter.setValidityListeners()
