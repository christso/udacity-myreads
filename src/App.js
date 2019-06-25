import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

  render() {
    return (
      <div>
        <Route exact path='/' render={() =>
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks books={this.state.booksByShelf['currentlyReading']} heading={'Currently Reading'} />
            <ListBooks books={this.state.booksByShelf['wantToRead']} heading={'Want to Read'} />
            <ListBooks books={this.state.booksByShelf['read']} heading={'Read'} />
          </div>} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
