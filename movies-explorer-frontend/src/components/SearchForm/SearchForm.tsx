import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

interface Props {
  onSubmit: (searchValue: string) => void
}

function SearchForm({ onSubmit }: Props) {
  const [searchValue, setSearchValue] = useState<string>('')

  function handleSubmit(evt: any) {
    evt.preventDefault();
    onSubmit(searchValue);
  }

  function handleChangeInputValue(evt: any) {
    setSearchValue(evt.target.value);
  }

  return (
    <form method="GET" className="search-form" name="search" onSubmit={handleSubmit} noValidate>
      <input className="search-form__query" placeholder="Фильм" type="text" value={searchValue} onChange={handleChangeInputValue}/>
      <button type="submit" className="search-form__btn-submit">Поиск</button>
      <FilterCheckbox />
      <hr className="search-form__line"/>
    </form>
  )
}

export default SearchForm
