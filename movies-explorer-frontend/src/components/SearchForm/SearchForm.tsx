import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";

interface Props {
  onSubmit: (searchParams: ISearchParams) => void;
  isFormDisabled?: boolean;
  initialSearchParams?: ISearchParams;
}
export interface ISearchParams {
  query: string;
  isShort: boolean;
}

function SearchForm({ onSubmit, isFormDisabled, initialSearchParams }: Props) {
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    query: "",
    isShort: false,
  });

  function handleSubmit(evt: any) {
    evt.preventDefault();
    onSubmit(searchParams);
  }

  function handleChangeInputValue(evt: any) {
    setSearchParams({
      query: evt.target.value,
      isShort: searchParams.isShort,
    });
  }

  function handleChangeIsShort() {
    onSubmit({
      query: searchParams.query,
      isShort: !searchParams.isShort,
    });
    setSearchParams({
      query: searchParams.query,
      isShort: !searchParams.isShort,
    });
  }

  useEffect(() => {
    if (initialSearchParams) {
      setSearchParams(initialSearchParams);
    } else {
      setSearchParams({ query: "", isShort: false });
    }
  }, [initialSearchParams]);

  return (
    <form
      method="GET"
      className="search-form"
      name="search"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className="search-form__query"
        placeholder="Фильм"
        type="text"
        value={searchParams.query}
        onChange={handleChangeInputValue}
        disabled={isFormDisabled}
      />
      <button
        type="submit"
        className="search-form__btn-submit"
        disabled={isFormDisabled}
      >
        Поиск
      </button>
      <FilterCheckbox
        handleChangeIsShort={handleChangeIsShort}
        isShortLocal={searchParams.isShort}
        isFormDisabled={isFormDisabled && isFormDisabled}
      />
      <hr className="search-form__line" />
    </form>
  );
}

export default SearchForm;
