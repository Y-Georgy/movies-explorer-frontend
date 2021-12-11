interface IOptionMainApi {
  baseUrl: string,
  headers: {
    'Content-Type': string
  }
}

interface IRegisterUserData {
  name: string,
  email: string,
  password: string
}

class MainApi {
  _baseUrl: string;
  _headers: { 'Content-Type': string; };

  constructor({ baseUrl, headers }: IOptionMainApi) {
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
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  postMovies(dataMovie: any) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(dataMovie),
    }).then(this._handleResponse)
  }

  deleteMovie(movieId: string) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  updateProfile(user: any) {
    return fetch(`${this._baseUrl}/users/me/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(user), // передавать name и email
    }).then(this._handleResponse)
  }

  register(userData: IRegisterUserData) {
    return fetch(`${this._baseUrl}/signup/`, {
      method: 'post',
      // credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(this._handleResponse)
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.movie.nomoredomains.rocks",
  headers: {
    'Content-Type': 'application/json',
  },
})
