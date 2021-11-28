import './Movies.css'
import Header from '../Header/Header';
import NavPage from '../NavPage/NavPage';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <>
      <Header children={<NavPage />} bgcolor="grey"/>
      <main className="Movies">
        <SearchForm />
      </main>
    </>
  )
}

export default Movies;
