import { API_URL } from '../utils/constants';
import { getToken } from '../utils/token';

class API {
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

const api = new API(API_URL, {
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export default api;
