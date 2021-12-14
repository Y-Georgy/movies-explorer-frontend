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
  const [preparedMovies, setPreparedMovies] = useState<IMovie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [messageSearchMovies, setMessageSearchMovies] = useState<string>('');

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
    const newMoviesArr = allMovies.map((movie: { movieId: any; }) => {
      const userMovie = userMovies.find((userMovie: any) => userMovie.movieId === movie.movieId)
      if (userMovie) return userMovie
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
        const formattedMoviesArr = formatMoviesArr(allMovies)
        const comparedMovies = checkLikedMovies(formattedMoviesArr, userMovies.data)
        const filtredMovies = filterMovies(searchQuery, comparedMovies);
        if (filtredMovies.length === 0) {
          setMessageSearchMovies('Ничего не найдено');
        } else {
          setPreparedMovies(filtredMovies);
          localStorage.setItem('movies', JSON.stringify(filtredMovies));
        }
      })
      .catch((err) => {
        setMessageSearchMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setIsLoadingMovies(false))
    }
  }

  useEffect(() => {
    const localMovies = localStorage.getItem('movies');
    if (localMovies) {
      setPreparedMovies(JSON.parse(localMovies))
    }
  }, [])

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="movies">
        <SearchForm onSubmit={handleSubmitSearch} />
        <MoviesCardList
          moviesArr={preparedMovies}
          isLoadingMovies={isLoadingMovies}
          massageSearchMovies={messageSearchMovies}
        />
        <Footer />
      </main>
    </>
  )
}

export default Movies;
