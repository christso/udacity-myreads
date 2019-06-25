import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

let shelfs = [
  {
    shelf: 'currentlyReading',
    bookShelfTitle: 'Currently Reading'
  },
  {
    shelf: 'wantToRead',
    bookShelfTitle: 'Want to Read'
  },
  {
    shelf: 'read',
    bookShelfTitle: 'Read'
  }
];

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
      this.setState(() => ({booksByShelf: booksByShelf}));
    });
  }

  render() {
    console.log('render', this.state.booksByShelf);
    return (
      <div>
        <Route exact path='/' component={ListBooks} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
