import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

function ListBooks(props) {
  const books = props.books;
  const heading = props.heading;
  const booksNode = books == null ? null : books.map(book => (
    <li key={book.id}>
      <Book book={book} />
    </li>
  ));
  return (<div className="list-books">
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
    <div className="open-search">
      <Link to='/search'>Search Books</Link>
    </div>
  </div>);
}

export default ListBooks;