const api = "https://reactnd-books-api.udacity.com"

let token = '3yflt3a8';

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);

fetch(`${api}/books`, { headers })
  .then(res => console.log(res));