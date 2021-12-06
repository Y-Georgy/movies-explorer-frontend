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
  const [renderMovies, setRenderMovies] = useState<React.ReactNode[]>([])

  // времменный эффект для тестирования верстки
  useEffect(() => {
    let content = [];
    for (let i: number = 0; i < quantityRenderMovies && i < movies.length; i++) {
      content.push(<MoviesCard
          key={movies[i]._id}
          movieCard={movies[i]}
        />);
    }
    setRenderMovies(content);
  }, [quantityRenderMovies, movies]);

  function handleClickBtnAnother(): void {
    setQuantityRenderMovies(quantityRenderMovies + 6);
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">{renderMovies}</ul>
      {isLoadingMovies && <Preloader />}
      {massageSearchMovies && <span className="movies-card-list__content-not-found">{massageSearchMovies}</span>}
      {(movies.length > quantityRenderMovies && !isLoadingMovies) && <button  className="movies-card-list__button-another" onClick={handleClickBtnAnother}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
