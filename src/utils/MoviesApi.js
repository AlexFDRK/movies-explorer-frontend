import { MOVIES_API_URL } from '../utils/constants';

class MOVIES_API {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _makeRequest(promise) {
    return promise
      .then((res) => {
        if (res.ok) {
          const answ = res.json();
          return answ;
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((obj) => {
        return obj;
      });
  }

  get(url) {
    const promise = fetch(url, {
      method: 'GET',
      headers: this._headers,
      // credentials: 'include',
    });

    return this._makeRequest(promise);
  }

  getMovies() {
    return this.get(this._url);
  }
}

const MoviesApi = new MOVIES_API(MOVIES_API_URL, {
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export default MoviesApi;
