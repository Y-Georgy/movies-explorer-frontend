import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect } from 'react';

interface Props {
  onSubmit: (searchParams: ISearchParams) => void
  localSearchParams?: {
    query: string,
    isShort: boolean
  }
}
export interface ISearchParams {
  query: string,
  isShort: boolean
}

function SearchForm({ onSubmit, localSearchParams }: Props) {
  const [searchParams, setSearchParams] = useState<ISearchParams>({ query: '', isShort: false})

  function handleSubmit(evt: any) {
    evt.preventDefault();
    onSubmit(searchParams);
  }

  function handleChangeInputValue(evt: any) {
    setSearchParams({
      query: evt.target.value,
      isShort: searchParams.isShort
    });
  }

  function handleChangeIsShort() {
    onSubmit({
      query: searchParams.query,
      isShort: !searchParams.isShort
    })
    setSearchParams({
      query: searchParams.query,
      isShort: !searchParams.isShort
    });
  }

  useEffect(() => {
    if (localSearchParams) {
      setSearchParams({
        query: localSearchParams.query,
        isShort: localSearchParams.isShort
      });
    }
  }, [localSearchParams])

  return (
    <form method="GET" className="search-form" name="search" onSubmit={handleSubmit} noValidate>
      <input className="search-form__query" placeholder="Фильм" type="text" value={searchParams.query} onChange={handleChangeInputValue}/>
      <button type="submit" className="search-form__btn-submit">Поиск</button>
      <FilterCheckbox
        handleChangeIsShort={handleChangeIsShort}
        localSearchParams={localSearchParams}
      />
      <hr className="search-form__line"/>
    </form>
  )
}

export default SearchForm
