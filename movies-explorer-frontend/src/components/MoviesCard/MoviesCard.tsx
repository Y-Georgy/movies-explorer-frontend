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
  return (
      <li className="movies-card">
        <a href={movieCard.trailerLink} target="_blank"><img src={movieCard.url} alt="Обложка фильма" className="movies-card__image" /></a>
        <p className="movies-card__name">{movieCard.nameRU}</p>
        <p className="movies-card__duration">{movieCard.duration}</p>
        <button className="movies-card__save movies-card__save_active" />
      </li>
  )
}

export default MoviesCard;
