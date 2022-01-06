import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { IMovie } from "../Movies/Movies";
import React from "react";
import Preloader from "../Preloader/Preloader";

interface Props {
  moviesArr: IMovie[];
  isLoadingMovies?: boolean;
  messageSearchMovies: string;
  deleteMovie: (movie: IMovie) => void;
  saveMovie?: (movie: IMovie) => void;
  children?: React.ReactNode;
}

function MoviesCardList({
  moviesArr,
  isLoadingMovies,
  messageSearchMovies,
  deleteMovie,
  saveMovie,
  children: ButtonYet,
}: Props) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {!isLoadingMovies &&
          !messageSearchMovies &&
          moviesArr.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movieCard={movie}
              deleteMovie={deleteMovie}
              saveMovie={saveMovie}
            />
          ))}
      </ul>
      {isLoadingMovies && <Preloader />}
      {messageSearchMovies && (
        <span className="movies-card-list__content-not-found">
          {messageSearchMovies}
        </span>
      )}
      {ButtonYet && !isLoadingMovies && !messageSearchMovies && ButtonYet}
    </section>
  );
}

export default MoviesCardList;
