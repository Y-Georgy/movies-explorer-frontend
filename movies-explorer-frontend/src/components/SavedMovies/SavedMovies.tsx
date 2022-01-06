import "./SavedMovies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { mainApi } from "../../utils/MainApi";
import { useEffect, useState } from "react";
import { filterMovies } from "../../utils/utils";
import { IMovie } from "../Movies/Movies";
import { ISearchParams } from "../SearchForm/SearchForm";

function SavedMovies() {
  const [message, setMessage] = useState<string>("");
  const [isShort, setIsShort] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [renderMovies, setRenderMovies] = useState<IMovie[]>([]);

  function getAllMovies() {
    const localAllMoviesJSON = localStorage.getItem("allMovies");
    let localAllMovies = [];
    if (localAllMoviesJSON) {
      localAllMovies = JSON.parse(localAllMoviesJSON);
    }
    return localAllMovies;
  }

  function filterUserMovies(movies: IMovie[]) {
    const userMovies = movies.filter((movie: IMovie) => {
      if (movie._id) return movie;
    });
    return userMovies;
  }

  // поиск
  function handleSubmitSearch(searchParams: ISearchParams) {
    setMessage("");
    if (searchParams.query.length === 0 && isShort === searchParams.isShort) {
      setMessage("Нужно ввести ключевое слово");
    } else {
      const allMovies = getAllMovies();
      const userMovies = filterUserMovies(allMovies);
      const filtredMovies = filterMovies(searchParams, userMovies);
      if (filtredMovies.length === 0) {
        setMessage("Ничего не найдено");
      } else {
        setRenderMovies(filtredMovies);
      }
      setIsShort(searchParams.isShort);
      setSearchQuery(searchParams.query);
    }
  }

  // получение фильмов
  function getCurrentUserMovies() {
    setMessage("");
    const allMovies = getAllMovies();
    const userMovies = filterUserMovies(allMovies);
    if (userMovies.length === 0) {
      setMessage("Нет сохраненных фильмов");
    }
    setRenderMovies(userMovies);
  }

  useEffect(() => {
    getCurrentUserMovies();
  }, [getCurrentUserMovies]);

  // удаление фильмов
  function deleteMovie(movieToDelete: IMovie) {
    if (movieToDelete._id) {
      mainApi
        .deleteMovie(movieToDelete._id)
        .then((res) => {
          setMessage("");
          const updatedMovies = renderMovies.filter((movie: IMovie) => {
            return movie._id !== movieToDelete._id;
          });
          if (updatedMovies.length === 0) {
            if (searchQuery.length || isShort) {
              setMessage("Ничего не найдено");
            } else {
              setMessage("Нет сохраненных фильмов");
            }
          }
          setRenderMovies(updatedMovies);

          const allMovies = getAllMovies();
          const updateAllMovies = allMovies.map((movie: IMovie) => {
            if (movie._id === movieToDelete._id) {
              delete movie["_id"];
              return movie;
            } else {
              return movie;
            }
          });
          localStorage.setItem("allMovies", JSON.stringify(updateAllMovies));
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey" />
      <main className="movies">
        <SearchForm onSubmit={handleSubmitSearch} />
        <MoviesCardList
          moviesArr={renderMovies}
          messageSearchMovies={message}
          deleteMovie={deleteMovie}
        />
        <Footer />
      </main>
    </>
  );
}

export default SavedMovies;
