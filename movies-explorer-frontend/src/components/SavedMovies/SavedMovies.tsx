import './SavedMovies.css'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { useEffect, useState } from 'react';
import { filterMovies } from '../../utils/utils';
import { IMovie } from '../Movies/Movies';
import { ISearchParams } from '../SearchForm/SearchForm';

function SavedMovies () {
  const [userMovies, setUserMovies] = useState<IMovie[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [isShort, setIsShort] = useState(false)
  const [renderMovies, setRenderMovies] = useState<IMovie[]>([])
  const [isFormSearchDisabled, setIsFormSearchDisabled] = useState<boolean>(false)

  // поиск
  function handleSubmitSearch(searchParams: ISearchParams) {
    setMessage('');
    if (searchParams.query.length === 0 && isShort === searchParams.isShort) {
      setMessage('Нужно ввести ключевое слово');
    } else {
      const filtredMovies = filterMovies(searchParams, userMovies)
      if (filtredMovies.length === 0) {
        setMessage('Ничего не найдено');
      } else {
        setRenderMovies(filtredMovies);
      }
      setIsShort(searchParams.isShort);
    }
  }

  // получение фильмов
  function getCurruntUserMovies() {
    setIsLoadingMovies(true);
    setIsFormSearchDisabled(true)
    setMessage('');
    mainApi.getMovies()
      .then((res) => {
        if (res.message) {
          setMessage(res.message)
        } else {
          setUserMovies(res.data)
          setRenderMovies(res.data)
        }
      })
      .catch((err) => {
        setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsFormSearchDisabled(false)
        setIsLoadingMovies(false)
      })
  }

  useEffect(() => {
    getCurruntUserMovies();
  }, [])

  // удаление фильмов
  function deleteMovie(movie: IMovie) {
    if (movie._id) {
      mainApi.deleteMovie(movie._id)
        .then(res => getCurruntUserMovies())
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="movies">
        <SearchForm
          onSubmit={handleSubmitSearch}
          isFormDisabled={isFormSearchDisabled}
        />
        <MoviesCardList
          moviesArr={message.length === 0 ? renderMovies : []}
          isLoadingMovies={isLoadingMovies}
          massageSearchMovies={message}
          deleteMovie={deleteMovie}
        />
        <Footer />
      </main>
    </>
  )
}

export default SavedMovies;
