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
import { ICard } from '../../utils/initialCards';

function App() {
  const [allMovies, setAllMovies] = useState<ICard[]>([]);
  const [filtredMovies, setFiltredMovies] = useState<ICard[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [massageSearchMovies, setMassageSearchMovies] = useState<string>('');

  function filterMovies(searchQuery: string) {
    return allMovies.filter((movie) => (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())))
  }

  function handleSubmitSearch(searchQuery: string) {
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

  useEffect(() => {

  }, [allMovies])

  useEffect(() => {
    const localMovies = localStorage.getItem('movies');
    if (localMovies) {
      setAllMovies(JSON.parse(localMovies))
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
            filtredMovies={filtredMovies}
            isLoadingMovies={isLoadingMovies}
            massageSearchMovies={massageSearchMovies}
          />} />
        <Route path="/saved-movies" element={
          <SavedMovies
            handleSubmitSearch={handleSubmitSearch}
            filtredMovies={filtredMovies}
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
