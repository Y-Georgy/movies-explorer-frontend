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

interface ILoginUserData {
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

  _handleResponse(res: { ok: boolean; json: () => any; status: any; }) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`)
  };

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
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 409) {
        return Promise.reject(`Переданный Email уже используется другим пользователем`)
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    })
  }

  register(userData: IRegisterUserData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'post',
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 409) {
        return Promise.reject(`Пользователь с таким Email уже существует`)
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    })
  }

  login(userData: ILoginUserData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'post',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 401) {
        return Promise.reject(`Неправильные почта или пароль`)
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    })
  }

  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'post',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    })
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.movie.nomoredomains.rocks", // production
  // baseUrl: "http://localhost:3001", // local
  headers: {
    'Content-Type': 'application/json',
  },
})
