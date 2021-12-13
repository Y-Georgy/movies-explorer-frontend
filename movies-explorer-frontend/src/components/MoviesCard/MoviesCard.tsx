import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
import iconMovie from '../../images/icon-movie.svg'
import { mainApi } from '../../vendor/MainApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export interface IMovie {
  country: string,
  description: string,
  director: string,
  duration: number,
  image: {
    url: string,
    formats: {
      thumbnail: {
        url: string
      }
    }
  }
  nameEN: string,
  nameRU: string,
  trailerLink: string,
  year: string,
  thumbnail: string,
  movieId: number,
  id: number
}

interface Props {
  movieCard: IMovie
}

const MoviesCard = ({ movieCard }: Props) => {
  const [isSavedMovie, setIsSavedMovie] = useState<Boolean>(false)
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext)

  function handleClickBtnSave(): void {
    if (!isSavedMovie) {
      mainApi.postMovies({
        country: movieCard.country,
        description: movieCard.description,
        director: movieCard.director,
        duration: movieCard.duration,
        image: `https://api.nomoreparties.co${movieCard.image.url}`,
        nameEN: movieCard.nameEN,
        nameRU: movieCard.nameRU,
        trailer: movieCard.trailerLink,
        year: movieCard.year,
        thumbnail: `https://api.nomoreparties.co${movieCard.image.formats.thumbnail.url}`,
        movieId: movieCard.id
      })
      .then(res => setIsSavedMovie(!isSavedMovie))
      .catch(err => console.log(err))
      } else {

      }
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
