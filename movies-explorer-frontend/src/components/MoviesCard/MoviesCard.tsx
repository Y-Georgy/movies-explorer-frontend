import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IMovie } from '../Movies/Movies';

interface Props {
  movieCard: IMovie,
  deleteMovie: (movie: IMovie) => void,
  saveMovie?: (movie: IMovie) => void,
}

const MoviesCard = ({ movieCard, deleteMovie, saveMovie }: Props) => {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext)

  function handleClickBtnLike(): void {
    if (movieCard._id) {
      deleteMovie(movieCard)
    } else if (saveMovie) {
      saveMovie(movieCard)
    }
  }

  function getTimeFromMins(duration: any) {
    const hours = Math.floor(duration/60);
    const minutes = duration % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  function handleClickBtnDelete() {
    deleteMovie(movieCard);
  }

  function getButton(): React.ReactNode | null {
    if (pathname === "/movies") {
      return <button className={
          `movies-card__button
          ${movieCard._id
            ? ' movies-card__button_icon_active'
            : ' movies-card__button_icon_save'}`
        }
        onClick={handleClickBtnLike}
        title={
          movieCard._id
            ? 'Удалить фильм из сохранённых'
            : 'Сохранить фильм'
        }
      />
    }
    if (pathname === "/saved-movies") {
      return <button className="movies-card__button movies-card__button_icon_delete" onClick={handleClickBtnDelete} title='Удалить фильм из сохранённых'/>
    }
    return null
  }

  return (
    <li className="movies-card">
      <a href={movieCard.trailer} target="_blank" rel="noreferrer">
        <img src={movieCard.image} alt="Обложка фильма" className="movies-card__image" />
      </a>
      <p className="movies-card__name">{movieCard.nameRU}</p>
      <p className="movies-card__duration">{getTimeFromMins(movieCard.duration)}</p>
      {getButton()}
    </li>
  )
}

export default MoviesCard;
