import React from 'react';
import { Link } from 'react-router-dom';
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
    if (!searchText) {
      this.setState(() => ({showBooks: [], searchText: ''}));
    } else {
      this.setState(() => ({searchText: searchText}));
      BooksAPI.search(searchText).then(books => {
        if (searchText === this.state.searchText) {
          this.setState((currState) => ({
            ...currState,
            showBooks: books
          }));
        }
      });
    }
  }

  handleInputChange = (e) => {
    
    this.updateSearch(e.target.value);
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