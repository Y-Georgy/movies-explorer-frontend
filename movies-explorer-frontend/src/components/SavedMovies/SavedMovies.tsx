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

function SavedMovies () {
  const [userMovies, setUserMovies] = useState<IMovie[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);

  // поиск
  function handleSubmitSearch(searchQuery: string) {
    setMessage('');
    if (searchQuery.length === 0) {
      setMessage('Нужно ввести ключевое слово');
    } else {
      const filtredMovies = filterMovies(searchQuery, userMovies)
      if (filtredMovies.length === 0) {
        setMessage('Ничего не найдено');
      } else {
        setUserMovies(filtredMovies);
      }
    }
  }

  // получение фильмов
  function getCurruntUserMovies() {
    setIsLoadingMovies(true);
    setMessage('');
    mainApi.getMovies()
      .then((res) => {
        res.message ? setMessage(res.message) : setUserMovies(res.data)
      })
      .catch((err) => {
        setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setIsLoadingMovies(false))
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
        <SearchForm onSubmit={handleSubmitSearch} />
        <MoviesCardList
          moviesArr={message.length === 0 ? userMovies : []}
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
