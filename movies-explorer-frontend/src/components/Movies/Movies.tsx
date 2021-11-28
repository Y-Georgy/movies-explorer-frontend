import './Movies.css'
import Header from '../Header/Header';
import NavPage from '../NavPage/NavPage';

function Movies() {
  return (
    <>
      <Header children={<NavPage />} bgcolor="grey"/>
      <main className="Movies">

      </main>
    </>
  )
}

export default Movies;
