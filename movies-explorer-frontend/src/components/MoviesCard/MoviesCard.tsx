import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
import { ICard } from '../../utils/initialCards';
import iconMovie from '../../images/icon-movie.svg'

interface Props {
  movieCard: ICard
}

const MoviesCard = ({ movieCard }: Props) => {
  const [isSavedMovie, setIsSavedMovie] = useState<Boolean>(false)
  const { pathname } = useLocation();

  function handleClickBtnSave(): void {
    setIsSavedMovie(!isSavedMovie);
  }

  function getTimeFromMins(): string {
    const hours = Math.floor(movieCard.duration/60);
    const minutes = movieCard.duration % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  function handleClickBtnDelete() {

  }

  function getButton(): React.ReactNode | null {
    if (pathname === "/movies") {
      return <button className={`movies-card__button movies-card__button_icon_save${isSavedMovie ? ' movies-card__button_icon_active' : ''}`} onClick={handleClickBtnSave} />
    }
    if (pathname === "/saved-movies") {
      return <button className="movies-card__button movies-card__button_icon_delete" onClick={handleClickBtnDelete} />
    }
    return null
  }

  return (
    <li className="movies-card">
      <a href={movieCard.trailerLink} target="_blank" rel="noreferrer">
        <img src={
          movieCard.image.url
            ? `https://api.nomoreparties.co${movieCard.image.url}`
            : iconMovie
          }
          alt="Обложка фильма" className="movies-card__image" />
      </a>
      <p className="movies-card__name">{movieCard.nameRU}</p>
      <p className="movies-card__duration">{getTimeFromMins()}</p>
      {getButton()}
    </li>
  )
}

export default MoviesCard;
