import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { initialCards } from '../../utils/initialCards';
import { ICard } from '../../utils/initialCards';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

interface Props {
  movies: ICard[],
  isLoadingMovies: boolean,
  massageSearchMovies: string
}

function MoviesCardList({ movies, isLoadingMovies, massageSearchMovies }: Props) {
  const [quantityRenderMovies, setQuantityRenderMovies] = useState<number>(6)
  const [quantityRenderMoviesAnother, setQuantityRenderMoviesAnother] = useState<number>(6)
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

  // RESIZE ведь не нужен???
  // useEffect(() => {
  //   let timeOutCheckClientWindow: any;
  //   window.addEventListener('resize', () => {
  //     clearTimeout(timeOutCheckClientWindow);
  //     timeOutCheckClientWindow = setTimeout(checkClientWindow, 1000)
  //   })
  // }, [])

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
        {renderMovies.length !== 0 && renderMovies.map((movie) => {
          return <MoviesCard
            key={movie.id}
            movieCard={movie}
          />
        })}
      </ul>
      {isLoadingMovies && <Preloader />}
      {massageSearchMovies && <span className="movies-card-list__content-not-found">{massageSearchMovies}</span>}
      {(movies.length > quantityRenderMovies && !isLoadingMovies) && <button  className="movies-card-list__button-another" onClick={handleClickBtnAnother}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
