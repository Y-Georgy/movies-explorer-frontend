import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { IMovie } from '../Movies/Movies';
import React from 'react';
import Preloader from '../Preloader/Preloader';

interface Props {
  moviesArr: IMovie[],
  isLoadingMovies: boolean,
  massageSearchMovies: string,
  deleteMovie: (movie: IMovie) => void,
  saveMovie?: (movie: IMovie) => void,
  children?: React.ReactNode
}

function MoviesCardList({ moviesArr, isLoadingMovies, massageSearchMovies, deleteMovie, saveMovie, children: ButtonYet }: Props) {

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {(!isLoadingMovies && !massageSearchMovies) && moviesArr.map((movie) => (
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
      {(ButtonYet && !isLoadingMovies && !massageSearchMovies) && ButtonYet}
    </section>
  )
}

export default MoviesCardList;
