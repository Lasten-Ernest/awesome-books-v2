const bookTitle = document.getElementById('title');
const authorName = document.getElementById('author');
const bookDisplayDiv = document.getElementById('displayBooks');

let id = 0;

class AwesomeBooks{
  constructor(bTitle, bAuthor, bId) {
    this.bTitle = bTitle;
    this.bAuthor = bAuthor;
    this.bId = bId;
  }

  static addNewBook(newBook) {
    const bookToAdd = document.createElement('div');
    bookToAdd.classList.add('bookToAdd');
    newBook.bId = id;
    bookToAdd.innerHTML = `<h4 class = "book-TitleAuthor">"${newBook.bTitle}" by ${newBook.bAuthor}</h4>
                          <button class="remove-button remBtn" id="${id}">Remove</button><br/>`;
    bookDisplayDiv.appendChild(bookToAdd);
    id += 1;
  }

  static displayBooks() {
    const books = AwesomeBooks.getBooks();
    books.forEach((newBook) => AwesomeBooks.addNewBook(newBook));
    }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    }
    else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static storeBook(newBook) {
    const books = AwesomeBooks.getBooks();
    books.unshift(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

const newBook = new AwesomeBooks(bTitle, bAuthor, bId);

document.querySelector('#displayBooks').addEventListener('click', (e) => {
  if(e.target.classList.contains('remove-button')) {
    e.target.parentElement.remove();
  }
  AwesomeBooks.removeBook(e.target.id);
});

document.querySelector('.addBookForm').addEventListener('click', (e) => {
  e.preventDefault();
  newBook.bTitle = bookTitle.value;
  newBook.bAuthor = authorName.value;
  newBook.bId = id;
  if (newBook.bTitle && newBook.bAuthor) {
    AwesomeBooks.storeBook(newBook);
    window.location.reload();
  }
});

document.addEventListener('DOMContentLoaded', AwesomeBooks.displayBooks);

