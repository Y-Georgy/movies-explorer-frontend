import { useState } from 'react';
import { Link } from 'react-router-dom';
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

  function handleClickBtnSave() {
    setIsSavedMovie(!isSavedMovie);
  }

  function getTimeFromMins() {
    const hours = Math.floor(movieCard.duration/60);
    const minutes = movieCard.duration % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  return (
      <li className="movies-card">
        <a href={movieCard.trailerLink} target="_blank">
          <img src={movieCard.url} alt="Обложка фильма" className="movies-card__image" />
        </a>
        <p className="movies-card__name">{movieCard.nameRU}</p>
        <p className="movies-card__duration">{getTimeFromMins()}</p>
        <button className={`movies-card__save${isSavedMovie ? ' movies-card__save_active' : ''}`} onClick={handleClickBtnSave} />
      </li>
  )
}

export default MoviesCard;
