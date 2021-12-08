import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

interface Props {
  onSubmit: (searchValue: string) => void
}

function SearchForm({ onSubmit }: Props) {
  const [searchValue, setSearchValue] = useState<string>('')

  function getMovies(evt: any) {
    evt.preventDefault();
    onSubmit(searchValue);
  }

  function handleChangeInputValue(evt: any) {
    setSearchValue(evt.target.value);
  }

  return (
    <form method="GET" className="search-form" name="search" onSubmit={getMovies} >
      <input className="search-form__query" placeholder="Фильм" type="text" required minLength={2} value={searchValue} onChange={handleChangeInputValue}/>
      <button type="submit" className="search-form__btn-submit">Поиск</button>
      <FilterCheckbox />
      <hr className="search-form__line"/>
    </form>
  )
}

export default SearchForm
