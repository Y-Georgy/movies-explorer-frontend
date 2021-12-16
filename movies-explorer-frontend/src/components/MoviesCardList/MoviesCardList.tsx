import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { IMovie } from '../Movies/Movies';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

type UserScreen = 's' | 'm' | 'l';
interface Props {
  moviesArr: IMovie[],
  isLoadingMovies: boolean,
  massageSearchMovies: string,
  deleteMovie: (movie: IMovie) => void,
  saveMovie?: (movie: IMovie) => void
}

function MoviesCardList({ moviesArr, isLoadingMovies, massageSearchMovies, deleteMovie, saveMovie }: Props) {
  const [renderMovies, setRenderMovies] = useState<IMovie[]>([])

  function checkClientWindow(): UserScreen {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) return 'l'
    else if (windowWidth < 768) return 's'
    else return 'm'
  }

  function getQuantityToFirstLoad(screen: UserScreen) {
    if (screen === 's') return 5
    else if (screen === 'm') return 8
    else return 12
  }

  function getQuantityToLoadAnother(screen: UserScreen) {
    if (screen === 'l') return 3
    else return 2
  }

  function handleClickBtnAnother() {
    const quantityRenderedMovies = renderMovies.length;
    const clientScreen = checkClientWindow();
    const quantityToAdd = getQuantityToLoadAnother(clientScreen);
    const quantityToRender = quantityRenderedMovies + quantityToAdd;
    const moviesToRender = moviesArr.slice(0, quantityToRender);
    setRenderMovies(moviesToRender);
  }

  useEffect(() => {
    const clientScreen = checkClientWindow();
    const quantityToFirstLoad = getQuantityToFirstLoad(clientScreen);
    const moviesToRender = moviesArr.slice(0, quantityToFirstLoad);
    setRenderMovies(moviesToRender);
  }, [moviesArr])

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {renderMovies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movieCard={movie}
            deleteMovie={deleteMovie}
            saveMovie={saveMovie}
          />
        ))}
      </ul>
      {isLoadingMovies && <Preloader />}
      {massageSearchMovies && <span className="movies-card-list__content-not-found">{massageSearchMovies}</span>}
      {moviesArr.length > renderMovies.length && <button  className="movies-card-list__button-another" onClick={handleClickBtnAnother}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
