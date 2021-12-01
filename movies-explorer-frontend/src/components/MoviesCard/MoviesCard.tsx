import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
// import { ICard } from '../../utils/initialCards';

interface Props {
  movieCard: {
    _id: string;
    nameRU: string,
    duration: number,
    trailerLink: string,
    url: string
  }
}

const MoviesCard = ({ movieCard }: Props) => {
  const [isSavedMovie, setIsSavedMovie] = useState<Boolean>(false)
  const { pathname } = useLocation();

  function handleClickBtnSave() {
    setIsSavedMovie(!isSavedMovie);
  }

  function getTimeFromMins() {
    const hours = Math.floor(movieCard.duration/60);
    const minutes = movieCard.duration % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  function handleClickBtnDelete() {

  }

  return (
      <li className="movies-card">
        <a href={movieCard.trailerLink} target="_blank" rel="noreferrer">
          <img src={movieCard.url} alt="Обложка фильма" className="movies-card__image" />
        </a>
        <p className="movies-card__name">{movieCard.nameRU}</p>
        <p className="movies-card__duration">{getTimeFromMins()}</p>
        {pathname === "/movies" && <button className={`movies-card__button movies-card__button_icon_save${isSavedMovie ? ' movies-card__button_icon_active' : ''}`} onClick={handleClickBtnSave} />}
        {pathname === "/saved-movies" && <button className="movies-card__button movies-card__button_icon_delete" onClick={handleClickBtnDelete} />}
      </li>
  )
}

export default MoviesCard;
