import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
import iconMovie from '../../images/icon-movie.svg'
import { mainApi } from '../../vendor/MainApi'
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IMovie } from '../Movies/Movies';

interface Props {
  movieCard: IMovie
}

const MoviesCard = ({ movieCard }: Props) => {
  const [isSavedMovie, setIsSavedMovie] = useState<Boolean>(false)
  const { pathname } = useLocation();
  // const currentUser = React.useContext(CurrentUserContext)

  function handleClickBtnSave(): void {
    if (!isSavedMovie) {
      mainApi.postMovies(movieCard)
      .then(res => setIsSavedMovie(!isSavedMovie))
      .catch(err => console.log(err))
      } else {

      }
  }
  console.log(movieCard)
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
      <a href={movieCard.trailer} target="_blank" rel="noreferrer">
        <img src={movieCard.image ? movieCard.image : iconMovie} alt="Обложка фильма" className="movies-card__image" />
      </a>
      <p className="movies-card__name">{movieCard.nameRU}</p>
      <p className="movies-card__duration">{movieCard.duration}</p>
      {getButton()}
    </li>
  )
}

export default MoviesCard;
