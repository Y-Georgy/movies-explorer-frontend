import './Movies.css'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { filterMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React from 'react';

export interface IMovie {
  country: string,
  description: string,
  director: string,
  duration: number,
  image: string,
  nameEN: string,
  nameRU: string,
  trailer: string,
  year: string,
  thumbnail: string,
  movieId: number,
  _id?: string
}

function Movies() {
  const currentUser = React.useContext(CurrentUserContext)
  const [preparedMovies, setPreparedMovies] = useState<IMovie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [messageSearchMovies, setMessageSearchMovies] = useState<string>('');

  // получение и подготовка массива с фильмами
  function formatMoviesArr(movies: any) {
    const newArrMovies = movies.map(((movie: any) => {
      const newMovie: IMovie = {
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        trailer: movie.trailerLink,
        year: movie.year,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }
      return newMovie;
    }))
    return newArrMovies
  }

  function checkLikedMovies(allMovies: any, userMovies: any) {
    const newMoviesArr = allMovies.map((movie: any) => {
      const userMovie = userMovies.find((userMovie: any) => userMovie.movieId === movie.movieId)
      userMovie ? movie._id = userMovie._id : delete movie._id
      return movie
      })
    return newMoviesArr
  }

  function handleSubmitSearch(searchQuery: string) {
    if (searchQuery.length === 0) {
      setMessageSearchMovies('Нужно ввести ключевое слово');
    } else {
      setMessageSearchMovies('');
      setIsLoadingMovies(true);

      Promise.all([moviesApi.getMovies(), mainApi.getMovies()])
      .then(([allMovies, userMovies]) => {
        console.log('allMovies', allMovies)
        let newMoviesArr = formatMoviesArr(allMovies);
        if (userMovies.data) newMoviesArr = checkLikedMovies(newMoviesArr, userMovies.data)
        newMoviesArr = filterMovies(searchQuery, newMoviesArr);
        if (newMoviesArr.length === 0) {
          setMessageSearchMovies('Ничего не найдено');
        } else {
          setPreparedMovies(newMoviesArr);
          localStorage.setItem('movies', JSON.stringify(newMoviesArr));
        }
      })
      .catch((err) => {
        setMessageSearchMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setIsLoadingMovies(false))
    }
  }

  // useEffect(() => {
  //   const localMovies = localStorage.getItem('movies');
  //   if (localMovies) {
  //     setPreparedMovies(JSON.parse(localMovies))
  //   }
  // }, [])

  // Удаление и сохранение фильмов
  function updateMovies() {
    mainApi.getMovies()
      .then(userMovies => {
        const comparedMovies = checkLikedMovies(preparedMovies, userMovies.data)
        setPreparedMovies(comparedMovies);
        localStorage.setItem('movies', JSON.stringify(comparedMovies));
      })
      .catch(console.log)
  }

  function deleteMovie(movie: IMovie) {
    if (movie._id) {
      mainApi.deleteMovie(movie._id)
        .then(res => updateMovies())
        .catch(console.log)
    }
  }

  function saveMovie(movie: IMovie) {
    movie._id && delete movie._id
    mainApi.postMovies(movie)
    .then(res => {
      updateMovies();
    })
    .catch(console.log)
  }

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="movies">
        <SearchForm onSubmit={handleSubmitSearch} />
        <MoviesCardList
          moviesArr={preparedMovies}
          isLoadingMovies={isLoadingMovies}
          massageSearchMovies={messageSearchMovies}
          deleteMovie={deleteMovie}
          saveMovie={saveMovie}
        />
        <Footer />
      </main>
    </>
  )
}

export default Movies;
