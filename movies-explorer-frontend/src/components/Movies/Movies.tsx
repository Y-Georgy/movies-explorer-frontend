import './Movies.css'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { ICard } from '../../utils/initialCards';

interface Props {
  handleSubmitSearch: (searchValue: string) => void
  filtredMovies: ICard[],
  isLoadingMovies: boolean,
  massageSearchMovies: string
}

function Movies({ handleSubmitSearch, filtredMovies, isLoadingMovies, massageSearchMovies}: Props) {
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

export default Movies;
