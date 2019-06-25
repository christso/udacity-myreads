import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import { camelToTitle } from './Utils';
import BooksGrid from './BooksGrid';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksByShelf: {}
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const booksByShelf = books.reduce((pv, x) => {
        (pv[x.shelf] = pv[x.shelf] || []).push(x);
        return pv;
      }, {});
      this.setState(() => ({ booksByShelf: booksByShelf }));
    });
  }

  handleChangeShelf = (shelf, book) => {
    // update state
    const booksByShelf = this.state.booksByShelf;
    const inShelfs = Object.keys(booksByShelf).filter((value, index) => {
      return booksByShelf[value].find(b => b.id === book.id);
    });
    const inShelf = inShelfs.length === 0 ? null : inShelfs[0];

    this.setState((currState) => ({
      ...currState,
      booksByShelf: {
        ...currState.booksByShelf,
        [shelf]: (currState.booksByShelf.hasOwnProperty(shelf)
          ? [...currState.booksByShelf[shelf], book] : [book]),
        [inShelf]: currState.booksByShelf[inShelf].filter(x => x.id !== book.id)
      }
    }));

    // todo: call Api
    BooksAPI.update(book, shelf).then(res => console.log('updated', res));
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() =>
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BooksGrid booksByShelf={this.state.booksByShelf} onChangeShelf={this.handleChangeShelf} />
          </div>} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
