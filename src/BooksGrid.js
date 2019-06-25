import React from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
import { camelToTitle } from './Utils';

class BooksGrid extends React.Component {
  groupBooksByShelf = (books) => books.reduce((pv, x) => {
    (pv[x.shelf] = pv[x.shelf] || []).push(x);
    return pv;
  }, {});

  render() {
    const booksByShelf = this.groupBooksByShelf(this.props.books);

    return (
      <div>
        {Object.keys(booksByShelf).map(shelf => {
          if (booksByShelf[shelf].length === 0) {
            return null;
          }
          return <ListBooks key={shelf} books={booksByShelf[shelf]}
            shelf={shelf}
            heading={camelToTitle(shelf)}
            onChangeShelf={this.props.onChangeShelf}
          />
        })}
      </div>
    )
  }
}

BooksGrid.propTypes = {
  searchText: PropTypes.string,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default BooksGrid;