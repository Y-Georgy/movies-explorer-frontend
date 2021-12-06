import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
      <form method="GET" className="search-form" name="search">
        <input className="search-form__query" placeholder="Фильм" type="text" required minLength={2} />
        <button type="submit" className="search-form__btn-submit">Поиск</button>
        <FilterCheckbox />
        <hr className="search-form__line"/>
      </form>
  )
}

export default SearchForm
