import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { initialCards } from '../../utils/initialCards';
import { ICard } from '../../utils/initialCards';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

interface Props {
  movies: ICard[],
  isLoadingMovies: boolean,
  massageSearchMovies: string
}

function MoviesCardList({ movies, isLoadingMovies, massageSearchMovies }: Props) {
  const [quantityRenderMovies, setQuantityRenderMovies] = useState<number>(6)
  const [quantityRenderMoviesAnother, setQuantityRenderMoviesAnother] = useState<number>(6)
  const [renderMovies, setRenderMovies] = useState<React.ReactNode[]>([])
  const [readyMovies, setReadyMovies] = useState<ICard[]>([])

  useEffect(() => {
    function checkClientWindow() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1280) {
        setQuantityRenderMovies(12);
        setQuantityRenderMoviesAnother(3);
        return
      } else if (windowWidth < 1280 && windowWidth >= 768) {
        setQuantityRenderMovies(8);
        setQuantityRenderMoviesAnother(2);
      } else if (windowWidth < 768) {
        setQuantityRenderMovies(5);
        setQuantityRenderMoviesAnother(2);
      }
      // console.log('resizeTimeOut', windowWidth);
    }
    checkClientWindow();

    let timeOutCheckClientWindow: any;
    window.addEventListener('resize', () => {
      clearTimeout(timeOutCheckClientWindow);
      timeOutCheckClientWindow = setTimeout(checkClientWindow, 1000)
    })
  }, [])

  // function getContentForRenderMovies() {
  //   let content = [];
  //   for (let i = 0; i < quantityRenderMovies && i < movies.length; i++) {
  //     content.push(<MoviesCard
  //         key={movies[i]._id}
  //         movieCard={movies[i]}
  //       />);
  //   }
  //   return content;
  // }

  // времменный эффект для тестирования верстки
  // useEffect(() => {
  //   const contentForRenderMovies = getContentForRenderMovies();
  //   setRenderMovies(contentForRenderMovies);
  // }, [movies]);

  function handleClickBtnAnother(): void {
    // setQuantityRenderMovies(quantityRenderMovies + quantityRenderMoviesAnother);
    // const contentForRenderMovies = getContentForRenderMovies();
    // setRenderMovies(contentForRenderMovies);
    const newQuantityRenderMovies = quantityRenderMovies + quantityRenderMoviesAnother;
    const moviesToRender = movies.slice(0, newQuantityRenderMovies);
    setReadyMovies(moviesToRender);
    setQuantityRenderMovies(newQuantityRenderMovies);
  }

  useEffect(() => {
    const moviesToRender = movies.slice(0, quantityRenderMovies);
    setReadyMovies(moviesToRender);
  }, [movies])

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {/* {renderMovies} */}
        {readyMovies.length !== 0 && readyMovies.map((movie) => {
          return <MoviesCard
            key={movie.id}
            movieCard={movie}
          />
        })}
      </ul>
      {isLoadingMovies && <Preloader />}
      {massageSearchMovies && <span className="movies-card-list__content-not-found">{massageSearchMovies}</span>}
      {(movies.length > quantityRenderMovies && !isLoadingMovies) && <button  className="movies-card-list__button-another" onClick={handleClickBtnAnother}>Ещё</button>}
    </section>
  )
}

export default MoviesCardList;
