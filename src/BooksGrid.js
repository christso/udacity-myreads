import React from 'react';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
import { camelToTitle } from './Utils';

class BooksGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    }
  }

  render() {
    const booksByShelf = this.props.booksByShelf;
    return (
      <div>
        {Object.keys(booksByShelf).map(shelf =>
          booksByShelf[shelf].length &&
          <ListBooks key={shelf} books={booksByShelf[shelf]}
            shelf={shelf}
            heading={camelToTitle(shelf)}
            onChangeShelf={this.props.onChangeShelf}
          />
        )}
      </div>
    )
  }
}

BooksGrid.propTypes = {
  booksByShelf: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default BooksGrid;