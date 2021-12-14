import './Movies.css'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import { moviesApi } from '../../vendor/MoviesApi';
import { mainApi } from '../../vendor/MainApi';

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
  const [allMovies, setAllMovies] = useState<IMovie[]>([]);
  const [filtredMovies, setFiltredMovies] = useState<IMovie[]>([]);
  const [currentUserMovies, setCurrentUserMovies] = useState<IMovie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [messageSearchMovies, setMessageSearchMovies] = useState<string>('');

  function filterMovies(searchQuery: string, movies: IMovie[]) {
    return movies.filter((movie) => (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())))
  }

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
      const newMovie = userMovies.find((userMovie: any) => userMovie.movieId === movie.movieId)
      if (newMovie) return newMovie
      // console.log(newMovie)
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
      moviesApi.getMovies()
        .then((allMovies) => {
          const formattedMoviesArr = formatMoviesArr(allMovies)
          mainApi.getMovies()
            .then(userMovies => {
              const comparedMovies = checkLikedMovies(formattedMoviesArr, userMovies.data)
              const filtredMovies = filterMovies(searchQuery, comparedMovies);
              if (filtredMovies.length === 0) {
                setMessageSearchMovies('Ничего не найдено');
              }
              setIsLoadingMovies(false);
              setFiltredMovies(filtredMovies);
              console.log('filtredMovies', filtredMovies)
            })
            .catch(err => console.log(err))

          setAllMovies(formattedMoviesArr);
          localStorage.setItem('movies', JSON.stringify(formattedMoviesArr));

        })
        .catch((err) => {
          console.log(err);
          setIsLoadingMovies(false);
          setMessageSearchMovies('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
    }
  }

  useEffect(() => {
    const localMovies = localStorage.getItem('movies');
    if (localMovies) {
      setAllMovies(JSON.parse(localMovies))
    }
  }, [])

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="movies">
        <SearchForm onSubmit={handleSubmitSearch} />
        <MoviesCardList
          moviesArr={filtredMovies}
          isLoadingMovies={isLoadingMovies}
          massageSearchMovies={messageSearchMovies}
        />
        <Footer />
      </main>
    </>
  )
}

export default Movies;
