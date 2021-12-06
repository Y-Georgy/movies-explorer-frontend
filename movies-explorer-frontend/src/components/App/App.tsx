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
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { moviesApi } from '../../vendor/MoviesApi';

function App() {
  const [movies, setMovies] = useState<[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [massageSearchMovies, setMassageSearchMovies] = useState<string>('');

  function handleSubmitSearch() {
    setMassageSearchMovies('');
    setIsLoadingMovies(true);
    moviesApi.getMovies()
      .then((res) => {
        if (res.length === 0) {
          setMassageSearchMovies('Ничего не найдено');
        }
        localStorage.setItem('movies', JSON.stringify(res));
        setIsLoadingMovies(false);
        setMovies(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingMovies(false);
        setMassageSearchMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
  }

  useEffect(() => {
    const localMovies = localStorage.getItem('movies');
    if (localMovies) {
      setMovies(JSON.parse(localMovies))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Header children={<NavAuth />} bgcolor="blue" />
            <Main />
            <Footer />
          </>
        } />
        <Route path="/movies" element={
          <Movies
            handleSubmitSearch={handleSubmitSearch}
            movies={movies}
            isLoadingMovies={isLoadingMovies}
            massageSearchMovies={massageSearchMovies}
          />} />
        <Route path="/saved-movies" element={
          <SavedMovies
            handleSubmitSearch={handleSubmitSearch}
            movies={movies}
            isLoadingMovies={isLoadingMovies}
            massageSearchMovies={massageSearchMovies}
          />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
