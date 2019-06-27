import React from 'react';
import { Link } from 'react-router-dom';
import { throttle, debounce } from 'throttle-debounce';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showBooks: [],
    };
  }

  componentDidMount() {
    this.updateSearch(this.state.searchText);
  }

  updateSearch = (searchText) => {
    const myBooks = this.props.books;

    if (!searchText) {
      this.setState(() => ({showBooks: [], searchText: ''}));
    } else {
      this.setState(() => ({searchText: searchText}));
      BooksAPI.search(searchText).then(books => {
        if (!Array.isArray(books)) {
          books = [];
        }

        books.forEach(b => {
          const myBook = myBooks.find(mb => mb.id === b.id);
          if (myBook != null) {
            b.shelf = myBook.shelf;
          } else {
            b.shelf = 'none';
          }
        });

        if (searchText === this.state.searchText) {
          this.setState((currState) => ({
            ...currState,
            showBooks: books
          }));
        }
      });
    }
  }
  
  updateSearchThrottled = throttle(500, this.updateSearch);
  updateSearchDebounced = debounce(500, this.updateSearch);

  handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length < 5) {
      this.updateSearchThrottled(value);
    } else {
      this.updateSearchDebounced(value);
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input type="text" placeholder="Search by title or author" onChange={this.handleInputChange} />

          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={this.state.showBooks}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;