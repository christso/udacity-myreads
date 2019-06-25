import React from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
import { camelToTitle } from './Utils';
import * as BooksAPI from './BooksAPI'

class BooksGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBooks: [
        // {id: 'sJf1vQAACAAJ'},
        // {id: 'IOejDAAAQBAJ'}
      ]
    }
  }

  componentDidMount() {
    const searchText = this.props.searchText;
    if (searchText) {
      BooksAPI.search(searchText).then(books => {
        this.setState((currState) => ({
          ...currState,
          showBooks: books
        }))
      });
    }
  }

  groupBooksByShelf = (books) => books.reduce((pv, x) => {
    (pv[x.shelf] = pv[x.shelf] || []).push(x);
    return pv;
  }, {});

  render() {
    const booksByShelf = this.groupBooksByShelf(this.props.books);
    Object.keys(booksByShelf).forEach(shelf => {
      if (!this.props.searchText) {
        return;
      }
      booksByShelf[shelf] = booksByShelf[shelf]
        .filter(book => this.state.showBooks.findIndex(v => book.id === v.id) !== -1) 
    });

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