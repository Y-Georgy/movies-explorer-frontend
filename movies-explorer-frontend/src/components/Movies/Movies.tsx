import "./Movies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import { filterMovies } from "../../utils/utils";
import iconMovie from "../../images/icon-movie.svg";
import { ISearchParams } from "../SearchForm/SearchForm";
import { SERVERERRORTEXT } from "../../utils/constants";

type UserScreen = "s" | "m" | "l";
export interface IMovie {
  country: string;
  description: string;
  director: string;
  duration: number;
  image: string;
  nameEN: string;
  nameRU: string;
  trailer: string;
  year: string;
  thumbnail: string;
  movieId: number;
  _id?: string;
}

interface ILocalData {
  allMovies: IMovie[];
  userMovies: IMovie[];
  searchData: { query: string; isShort: boolean };
}

function Movies() {
  const [preparedMovies, setPreparedMovies] = useState<IMovie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [messageSearchMovies, setMessageSearchMovies] = useState<string>("");
  const [renderMovies, setRenderMovies] = useState<IMovie[]>([]);
  const [isFormSearchDisabled, setIsFormSearchDisabled] =
    useState<boolean>(false);

  // получение и подготовка массива с фильмами
  function formatMoviesArr(movies: any) {
    const newArrMovies = movies.map((movie: any) => {
      const newMovie: IMovie = {
        country: movie.country ? movie.country : "Неизвестно",
        description: movie.description ? movie.description : "Нет описания",
        director: movie.director ? movie.director : "Неизвестно",
        duration: movie.duration ? movie.duration : 0,
        image: movie.image.url
          ? `https://api.nomoreparties.co${movie.image.url}`
          : iconMovie,
        nameEN: movie.nameEN ? movie.nameEN : "Неизвестно",
        nameRU: movie.nameRU ? movie.nameRU : "Неизвестно",
        trailer: movie.trailerLink
          ? movie.trailerLink
          : `https://www.youtube.com/results?search_query=трейлер+${movie.nameRU}`,
        year: movie.year ? movie.year : "Неизвестно",
        thumbnail: movie.image.formats.thumbnail.url
          ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
          : iconMovie,
        movieId: movie.id,
      };
      return newMovie;
    });
    return newArrMovies;
  }

  function checkLikedMovies(allMovies: IMovie[], userMovies: IMovie[]) {
    const newMoviesArr = allMovies.map((movie: any) => {
      if (userMovies.length !== 0) {
        const userMovie = userMovies.find(
          (userMovie: any) => userMovie.movieId === movie.movieId
        );
        userMovie ? (movie._id = userMovie._id) : delete movie._id;
        return movie;
      } else {
        if (movie._id) delete movie["_id"];
        return movie;
      }
    });
    return newMoviesArr;
  }

  function prepareMovies(
    allMovies: IMovie[],
    userMovies: IMovie[],
    searchParams: ISearchParams
  ) {
    let newMoviesArr: IMovie[] = allMovies;
    newMoviesArr = checkLikedMovies(allMovies, userMovies);
    newMoviesArr = filterMovies(searchParams, newMoviesArr);
    if (newMoviesArr.length === 0) setMessageSearchMovies("Ничего не найдено");
    setPreparedMovies(newMoviesArr);
  }

  function handleSubmitSearch(searchParams: ISearchParams) {
    if (searchParams.query.length === 0) {
      setMessageSearchMovies("Нужно ввести ключевое слово");
    } else {
      setMessageSearchMovies("");
      localStorage.setItem(
        "searchData",
        JSON.stringify({
          query: searchParams.query,
          isShort: searchParams.isShort,
        })
      );

      const localData = getLocalData();
      if (localData.allMovies.length !== 0) {
        prepareMovies(localData.allMovies, localData.userMovies, searchParams);
      } else {
        setIsLoadingMovies(true);
        setIsFormSearchDisabled(true);
        Promise.all([moviesApi.getMovies(), mainApi.getMovies()])
          .then(([allMovies, userMovies]) => {
            const allMoviesArr = formatMoviesArr(allMovies);
            if (!userMovies.data) userMovies.data = [];
            prepareMovies(allMoviesArr, userMovies.data, searchParams);
            localStorage.setItem("allMovies", JSON.stringify(allMoviesArr));
            localStorage.setItem("userMovies", JSON.stringify(userMovies.data));
          })
          .catch(() => {
            setMessageSearchMovies(SERVERERRORTEXT);
          })
          .finally(() => {
            setIsLoadingMovies(false);
            setIsFormSearchDisabled(false);
          });
      }
    }
  }

  function getLocalData() {
    const localAllMoviesJSON = localStorage.getItem("allMovies");
    const localUserMoviesJSON = localStorage.getItem("userMovies");
    const localSearchDataJSON = localStorage.getItem("searchData");

    let localData: ILocalData = {
      allMovies: [],
      userMovies: [],
      searchData: { query: "", isShort: false },
    };

    if (localAllMoviesJSON)
      localData.allMovies = JSON.parse(localAllMoviesJSON);
    if (localUserMoviesJSON)
      localData.userMovies = JSON.parse(localUserMoviesJSON);
    if (localSearchDataJSON)
      localData.searchData = JSON.parse(localSearchDataJSON);

    return localData;
  }

  useEffect(() => {
    const localData = getLocalData();
    if (localData.allMovies.length !== 0) {
      prepareMovies(
        localData.allMovies,
        localData.userMovies,
        localData.searchData
      );
    }
  }, []);

  function deleteMovie(movie: IMovie) {
    if (movie._id) {
      mainApi
        .deleteMovie(movie._id)
        .then((res) => {
          const localData = getLocalData();

          const newAllMovies = localData.allMovies.map((elem: IMovie) => {
            if (elem._id === movie._id) delete elem._id;
            return elem;
          });
          localStorage.setItem("allMovies", JSON.stringify(newAllMovies));

          const indexMovieToDelete = localData.userMovies.findIndex(
            (elem: IMovie) => elem._id === movie._id
          );
          localData.userMovies.splice(indexMovieToDelete, 1);
          localStorage.setItem(
            "userMovies",
            JSON.stringify(localData.userMovies)
          );

          const newRenderMovies = checkLikedMovies(
            renderMovies,
            localData.userMovies
          );
          setRenderMovies(newRenderMovies);
        })
        .catch(console.log);
    }
  }

  function saveMovie(movie: IMovie) {
    movie._id && delete movie._id;
    mainApi
      .postMovies(movie)
      .then((res) => {
        const localData = getLocalData();
        const newUserMovie: IMovie = res.data.movie;
        const newAllMovies = localData.allMovies.map((elem: IMovie) => {
          if (elem.movieId === newUserMovie.movieId)
            elem._id = newUserMovie._id;
          return elem;
        });
        localStorage.setItem("allMovies", JSON.stringify(newAllMovies));
        localData.userMovies.push(newUserMovie);
        localStorage.setItem(
          "userMovies",
          JSON.stringify(localData.userMovies)
        );

        const newRenderMovies = checkLikedMovies(
          renderMovies,
          localData.userMovies
        );
        setRenderMovies(newRenderMovies);
      })
      .catch(console.log);
  }

  // вывод фильмов в определенном количестве
  function checkClientWindow(): UserScreen {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) return "l";
    else if (windowWidth < 768) return "s";
    else return "m";
  }

  function getQuantityToFirstLoad(screen: UserScreen) {
    if (screen === "s") return 5;
    else if (screen === "m") return 8;
    else return 12;
  }

  function getQuantityToLoadAnother(screen: UserScreen) {
    if (screen === "l") return 3;
    else return 2;
  }

  function handleClickBtnAnother() {
    const quantityRenderedMovies = renderMovies.length;
    const clientScreen = checkClientWindow();
    const quantityToAdd = getQuantityToLoadAnother(clientScreen);
    const quantityToRender = quantityRenderedMovies + quantityToAdd;
    const moviesToRender = preparedMovies.slice(0, quantityToRender);
    setRenderMovies(moviesToRender);
  }

  useEffect(() => {
    const clientScreen = checkClientWindow();
    const quantityToFirstLoad = getQuantityToFirstLoad(clientScreen);
    const moviesToRender = preparedMovies.slice(0, quantityToFirstLoad);
    setRenderMovies(moviesToRender);
  }, [preparedMovies]);

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey" />
      <main className="movies">
        <SearchForm
          onSubmit={handleSubmitSearch}
          isFormDisabled={isFormSearchDisabled}
        />
        <MoviesCardList
          moviesArr={renderMovies}
          isLoadingMovies={isLoadingMovies}
          massageSearchMovies={messageSearchMovies}
          deleteMovie={deleteMovie}
          saveMovie={saveMovie}
          children={
            preparedMovies.length > renderMovies.length && (
              <button
                className="movies-card-list__button-another"
                onClick={handleClickBtnAnother}
              >
                Ещё
              </button>
            )
          }
        />
        <Footer />
      </main>
    </>
  );
}

export default Movies;
