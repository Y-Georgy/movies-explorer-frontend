import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { initialCards } from '../../utils/initialCards';
import { ICard } from '../../utils/initialCards';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

function MoviesCardList() {
  // eslint-disable-next-line
  const [movies, setMovies] = useState<ICard[]>(initialCards)
  const [quantityRenderMovies, setQuantityRenderMovies] = useState<number>(6)
  const [renderMovies, setRenderMovies] = useState<React.ReactNode[]>([])
  const [isContent, setIsContent] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // времменный эффект для тестирования верстки
  useEffect(() => {
      setIsLoading(true);
      function testLoading() {
        let content = [];
        for (let i = 0; i < quantityRenderMovies && i < movies.length; i++) {
          content.push(<MoviesCard
              key={movies[i]._id}
              movieCard={movies[i]}
            />);
        }
        if (content.length === 0) {
          setIsContent(false);
        } else {
        setIsContent(true);
        }
        setIsLoading(false);
        setRenderMovies(content);
      };
      setTimeout(testLoading, 2000); // убрать по готовности API
  }, [quantityRenderMovies]);

  function handleClickBtnAnother() {
    setQuantityRenderMovies(quantityRenderMovies + 6);
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">{renderMovies}</ul>
      {isLoading && <Preloader />}
      {!isContent && <span className="movies-card-list__content-not-found">Ни чего не найдено</span>}
      {(movies.length > quantityRenderMovies && !isLoading) && <button  className="movies-card-list__button-another" onClick={handleClickBtnAnother}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
