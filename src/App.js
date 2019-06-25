import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

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
    const inShelf = inShelfs.length == 0 ? null : inShelfs[0];
    this.setState((currState) => ({
      ...currState,
      booksByShelf: {
        ...currState.booksByShelf,
        [shelf]: [...currState.booksByShelf[shelf], book],
        [inShelf]: currState.booksByShelf[inShelf].filter(x => x.id !== book.id)
      }
    }));  
    
    // todo: call Api
  }

  render() {
    console.log('state', this.state.booksByShelf);

    const camelToTitle = (camelCase) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim()
    
    return (
      <div>
        <Route exact path='/' render={() =>
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {Object.keys(this.state.booksByShelf).map(shelf => 
              <ListBooks key={shelf} books={this.state.booksByShelf[shelf]} 
                heading={camelToTitle(shelf)}
                onChangeShelf={this.handleChangeShelf}
              />)}
          </div>} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
