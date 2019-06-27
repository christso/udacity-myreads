import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import BooksGrid from './BooksGrid';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({ books: books }));
    });
  }

  handleChangeShelf = (shelf, book) => {
    BooksAPI.update(book, shelf).then(res => {
      book.shelf = shelf;
      this.setState((currState) => ({
        ...currState,
        books: [...currState.books.filter(x => x.id !== book.id), book]
      }));
      console.log('updated', res);
    });
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() =>
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BooksGrid books={this.state.books} onChangeShelf={this.handleChangeShelf} />
          </div>} />
        <Route path='/search' render={() => 
          <SearchBooks books={this.state.books} onChangeShelf={this.handleChangeShelf} />} />
      </div>
    )
  }
}

export default BooksApp
