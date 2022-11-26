import { API_URL } from './constants';
import { getToken } from './token';

class MAIN_API {
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

  getUser(token) {
    this._headers.Authorization = `Bearer ${token}`;
    return this.get(this._url + 'users/me');
  }

  getSavedMovies(token) {
    this._headers.Authorization = `Bearer ${token}`;
    return this.get(this._url + 'movies');
  }

  get(url) {
    const promise = fetch(url, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });

    return this._makeRequest(promise);
  }

  patchProfile(body) {
    this._headers.Authorization = `Bearer ${getToken()}`;
    return this.patch(this._url + 'users/me', body);
  }

  postMovie(body) {
    this._headers.Authorization = `Bearer ${getToken()}`;
    const url = this._url + 'movies';
    const promise = fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
      credentials: 'include',
    });

    return this._makeRequest(promise);
  }

  patch(url, body) {
    this._headers.Authorization = `Bearer ${getToken()}`;
    const promise = fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
      credentials: 'include',
    });

    return this._makeRequest(promise);
  }
}

const MainApi = new MAIN_API(API_URL, {
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export default MainApi;
