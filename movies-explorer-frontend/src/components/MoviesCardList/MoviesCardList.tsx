import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { ICard } from '../../utils/initialCards';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

interface Props {
  movies: ICard[],
  isLoadingMovies: boolean,
  massageSearchMovies: string
}

function MoviesCardList({ movies, isLoadingMovies, massageSearchMovies }: Props) {
  const [renderMovies, setRenderMovies] = useState<ICard[]>([])

  function checkClientWindow() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) return 'l'
    else if (windowWidth < 768) return 's'
    else return 'm'
  }

  function getQuantityToFirstLoad(screen: 's' | 'm' | 'l') {
    if (screen === 's') return 5
    else if (screen === 'm') return 8
    else return 12
  }

  function getQuantityToLoadAnother(screen: 's' | 'm' | 'l') {
    if (screen === 'l') return 3
    else return 2
  }

  function handleClickBtnAnother() {
    const quantityRenderedMovies = renderMovies.length;
    const clientScreen = checkClientWindow();
    const quantityToAdd = getQuantityToLoadAnother(clientScreen);
    const quantityToRender = quantityRenderedMovies + quantityToAdd;
    const moviesToRender = movies.slice(0, quantityToRender);
    setRenderMovies(moviesToRender);
  }

  useEffect(() => {
    const clientScreen = checkClientWindow();
    const quantityToFirstLoad = getQuantityToFirstLoad(clientScreen);
    const moviesToRender = movies.slice(0, quantityToFirstLoad);
    setRenderMovies(moviesToRender);
  }, [movies])

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {renderMovies.length !== 0 && renderMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movieCard={movie}
          />
        ))}
      </ul>
      {isLoadingMovies && <Preloader />}
      {massageSearchMovies && <span className="movies-card-list__content-not-found">{massageSearchMovies}</span>}
      {movies.length > renderMovies.length && <button  className="movies-card-list__button-another" onClick={handleClickBtnAnother}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
