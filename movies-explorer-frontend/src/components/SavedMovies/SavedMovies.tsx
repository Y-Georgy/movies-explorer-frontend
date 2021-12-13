import './SavedMovies.css'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { IMovie } from '../MoviesCard/MoviesCard';
import React from 'react';

interface Props {
  handleSubmitSearch: (searchValue: string) => void,
  filtredMovies: IMovie[],
  isLoadingMovies: boolean,
  massageSearchMovies: string
}

function SavedMovies ({ handleSubmitSearch, filtredMovies, isLoadingMovies, massageSearchMovies }: Props) {
  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="movies">
        <SearchForm onSubmit={handleSubmitSearch} />
        <MoviesCardList
          filtredMovies={filtredMovies}
          isLoadingMovies={isLoadingMovies}
          massageSearchMovies={massageSearchMovies}
        />
        <Footer />
      </main>
    </>
  )
}

export default SavedMovies;
