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

  handleChangeShelf = (shelf) => {
    console.log(shelf);
  }

  render() {
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
              <ListBooks key={shelf} books={this.state.booksByShelf[shelf]} heading={camelToTitle(shelf)} />)}
          </div>} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
