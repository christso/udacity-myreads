import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
  const thumbnail = props.book.imageLinks.thumbnail;
  const title = props.book.title;
  const authors = props.book.authors;

  const handleChangeShelf = shelf => {
    props.onChangeShelf(shelf);
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + thumbnail +  '")' }}></div>
        <div className="book-shelf-changer">
          <select onChange={(e) => handleChangeShelf(e.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(' & ')}</div>
    </div>
  );
}

Book.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}

export default Book;