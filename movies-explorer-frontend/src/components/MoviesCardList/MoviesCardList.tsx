import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { initialCards } from '../../utils/initialCards';
import { ICard } from '../../utils/initialCards';
import React, { useState } from 'react';
import Preloader from '../Preloader/Preloader';

function MoviesCardList() {
const [movies, setMovies] = useState<ICard[]>(initialCards)
const [quantityRenderMovies, setQuantityRenderMovies] = useState<number>(6)

// useEffect(() => {
//   if (allMovies.length >= isAnotherMovies) {
//     setIsAnotherMovies(true);
//   }
// },[isAnotherMovies])

// {movies.map((movie) => (
//   <MoviesCard
//     key={movie._id}
//     movieCard={movie}
//   />
// ))}

// {for (let i = 0; i <= ${quantityRenderMovies}; i++) {
//   <MoviesCard
//   key={movies[i]._id}
//   movieCard={movies[i]}
//   />
// }}

function renderCards() {
  let content = [];
  for (let i = 0; i < quantityRenderMovies && i < movies.length; i++) {
    content.push(<MoviesCard
        key={movies[i]._id}
        movieCard={movies[i]}
      />);
  }
  return content;
};

function handleClickBtnAnother() {
  setQuantityRenderMovies(quantityRenderMovies + 6);
}

  return (
      <section className="movies-card-list">
        <ul className="movies-card-list__container">{renderCards()}</ul>
        {/* <Preloader /> */}
        {movies.length > quantityRenderMovies && <button  className="movies-card-list__button-another" onClick={handleClickBtnAnother}>Ещё</button>}
      </section>
  )
}

export default MoviesCardList;
