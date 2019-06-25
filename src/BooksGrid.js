import React from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
import { camelToTitle } from './Utils';
import * as BooksAPI from './BooksAPI'

class BooksGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
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
        console.log(books);
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
    const booksByShelf = this.props.booksByShelf;
    Object.keys(booksByShelf).forEach(shelf => {
      if (this.state.searchText === '') {
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
  booksByShelf: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default BooksGrid;