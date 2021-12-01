import './SavedMovies.css'
import Header from '../Header/Header';
import NavPage from '../NavPage/NavPage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <>
      <Header children={<NavPage />} bgcolor="grey"/>
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
        <Footer />
      </main>
    </>
  )
}

export default SavedMovies;
