import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import NavAuth from '../NavAuth/NavAuth';
import Navigation from '../Navigation/Navigation';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { moviesApi } from '../../vendor/MoviesApi';
import { IMovie } from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { mainApi } from '../../vendor/MainApi';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export interface IDataLogin { email: string, password: string }

function App() {
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState<IMovie[]>([]);
  const [filtredMovies, setFiltredMovies] = useState<IMovie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [massageSearchMovies, setMassageSearchMovies] = useState<string>('');
  const [currentUser, setCurrentUser] = useState({})
  const [errorLoginMessage, setErrorLoginMessage] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  function filterMovies(searchQuery: string) {
    return allMovies.filter((movie) => (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())))
  }

  function handleSubmitSearch(searchQuery: string) {
    if (searchQuery.length === 0) {
      setMassageSearchMovies('Нужно ввести ключевое слово');
    } else {
      setMassageSearchMovies('');
      setIsLoadingMovies(true);
      moviesApi.getMovies()
        .then((res) => {
          setAllMovies(res);
          localStorage.setItem('movies', JSON.stringify(res));
          const filtredMovies = filterMovies(searchQuery);
          if (filtredMovies.length === 0) {
            setMassageSearchMovies('Ничего не найдено');
          }
          setIsLoadingMovies(false);
          setFiltredMovies(filtredMovies);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingMovies(false);
          setMassageSearchMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
    }
  }

  useEffect(() => {
    const localMovies = localStorage.getItem('movies');
    if (localMovies) {
      setAllMovies(JSON.parse(localMovies))
    }
  }, [])

  function handleSubmitLogin({ email, password }: IDataLogin) {
    setErrorLoginMessage('')
    mainApi.login({ email, password })
    .then(res => {
      checkUserToken();
      navigate('/movies');
    })
    .catch(err => {
      setErrorLoginMessage(err)
    });
  }

  function checkUserToken() {
    mainApi.getProfile()
      .then(res => auth(res.data))
      .catch(err => console.log(err))
  }

  // АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function auth(dataUser: any) {
    setLoggedIn(true)
    setCurrentUser(dataUser)
  }

  // ПРОВЕРКА ПОЛЬЗОВАТЕЛЯ ПРИ ВХОДЕ
  useEffect(() => {
    checkUserToken();
  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={
            <>
              <Header
                children={loggedIn ? <Navigation /> : <NavAuth />}
                bgcolor="blue"
              />
              <Main />
              <Footer />
            </>
          } />
          <Route
            path="/movies"
            element={<ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              handleSubmitSearch={handleSubmitSearch}
              filtredMovies={filtredMovies}
              isLoadingMovies={isLoadingMovies}
              massageSearchMovies={massageSearchMovies}
            />}
          />
          <Route
            path="/saved-movies"
            element={<ProtectedRoute
              loggedIn={loggedIn}
              component={SavedMovies}
              handleSubmitSearch={handleSubmitSearch}
              filtredMovies={filtredMovies}
              isLoadingMovies={isLoadingMovies}
              massageSearchMovies={massageSearchMovies}
            />}
          />
          <Route path="/signup" element={<Register onSubmit={handleSubmitLogin} errorLoginMessage={errorLoginMessage}/>} />
          <Route path="/signin" element={<Login onSubmit={handleSubmitLogin} errorLoginMessage={errorLoginMessage}/>} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} loggedIn={loggedIn} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
