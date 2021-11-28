import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <form method="GET" className="search-form" name="search">
      <input className="search-form__query" placeholder="Фильм" type="text" required/>
      <button type="submit" className="search-form__btn-submit">Поиск</button>
      <FilterCheckbox />
    </form>
  )
}

export default SearchForm
