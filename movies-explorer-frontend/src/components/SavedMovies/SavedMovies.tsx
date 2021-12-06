import './SavedMovies.css'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

interface Props {
  handleSubmitSearch: () => void,
  movies: [],
  isLoadingMovies: boolean,
  massageSearchMovies: string
}

function SavedMovies({ handleSubmitSearch, movies, isLoadingMovies, massageSearchMovies }: Props) {
  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="movies">
        <SearchForm onSubmit={handleSubmitSearch} />
        <MoviesCardList
          movies={movies}
          isLoadingMovies={isLoadingMovies}
          massageSearchMovies={massageSearchMovies}
        />
        <Footer />
      </main>
    </>
  )
}

export default SavedMovies;
