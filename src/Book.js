import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
  const thumbnail = props.book.imageLinks.thumbnail;
  const title = props.book.title;
  const authors = props.book.authors;
  const shelf = props.shelf;

  const handleChangeShelf = shelf => {
    props.onChangeShelf(shelf, props.book);
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + thumbnail +  '")' }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={shelf} onChange={(e) => handleChangeShelf(e.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors ? authors.join(' & ') : null}</div>
    </div>
  );
}

Book.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}

export default Book;