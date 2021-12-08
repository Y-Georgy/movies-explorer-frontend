interface IOptionMoviesApi {
  baseUrl: string,
  headers: { 'Content-Type': string }
}

class MoviesApi {
  _baseUrl: string;
  _headers: { 'Content-Type': string; };

  constructor({ baseUrl, headers }: IOptionMoviesApi) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  // обработчик ответа
  _handleResponse(res: { ok: boolean; json: () => any; status: any; }) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`)
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse)
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    'Content-Type': 'application/json',
  },
})
