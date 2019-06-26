import React from 'react';
import Book from './Book';

function ListBooks(props) {
  const books = props.books;
  const heading = props.heading;
  const booksNode = books && Array.isArray(books) ? books.map(book => (
    <li key={book.id}>
      <Book book={book} onChangeShelf={props.onChangeShelf} />
    </li>
  )) : null;
  return (
    <div className="list-books">
      {
        heading ?
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{heading}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksNode}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          :
          <ol className="books-grid">
            {booksNode}
          </ol>
      }

    </div>);
}

export default ListBooks;