import './SavedMovies.css'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { mainApi } from '../../vendor/MainApi';
import { useEffect, useState } from 'react';

function SavedMovies () {
  const [userMovies, setUserMovies] = useState([]);
  const [message, setMessage] = useState<string>('');
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);

  function handleSubmitSearch() {

  }

  function getCurruntUserMovies() {
    setIsLoadingMovies(true);
    setMessage('');
    mainApi.getMovies()
      .then((res) => {
        if (res.data.length === 0) {
          setMessage('У Вас еще нет сохранённых фильмов');
        } else {
          setUserMovies(res.data);
          console.log('userMovies', res.data)

        }
        setIsLoadingMovies(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingMovies(false);
        setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
  }

  useEffect(() => {
    getCurruntUserMovies();
  }, [])

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="movies">
        <SearchForm onSubmit={handleSubmitSearch} />
        <MoviesCardList
          moviesArr={userMovies}
          isLoadingMovies={isLoadingMovies}
          massageSearchMovies={message}
        />
        <Footer />
      </main>
    </>
  )
}

export default SavedMovies;
