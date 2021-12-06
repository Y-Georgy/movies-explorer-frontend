import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

interface Props {
  onSubmit: () => void
}

function SearchForm({ onSubmit }: Props) {
  function getMovies(evt: any) {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <form method="GET" className="search-form" name="search" onSubmit={getMovies} >
      <input className="search-form__query" placeholder="Фильм" type="text" required minLength={2} />
      <button type="submit" className="search-form__btn-submit">Поиск</button>
      <FilterCheckbox />
      <hr className="search-form__line"/>
    </form>
  )
}

export default SearchForm
