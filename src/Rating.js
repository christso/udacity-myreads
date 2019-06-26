import React from 'react';
import PropTypes from 'prop-types';

function Rating(props) {
  var rating = props.rating;
  var numberOfStars = props.numberOfStars;

  var starsArray = [];
  for (let i = 0; i < numberOfStars; i++) {
    if (i < rating) {
      starsArray.push(<span key={i} className="fa fa-star checked"></span>);
    } else {
      starsArray.push(<span key={i} className="fa fa-star"></span>);
    }
  }

  return (
    <div>
      {starsArray}
    </div>
  )
}

Rating.propTypes = {
  rating: PropTypes.number,
  numberOfStars: PropTypes.number.isRequired
};

export default Rating;