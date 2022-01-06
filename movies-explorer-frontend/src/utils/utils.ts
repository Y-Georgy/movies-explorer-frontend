import { IMovie } from "../components/Movies/Movies";
import { ISearchParams } from "../components/SearchForm/SearchForm";
import { SHORTMOVIEDURATION } from "./constants";

export function filterMovies(searchParams: ISearchParams, movies: IMovie[]) {
  const filtredQueryArr = movies.filter((movie) => (movie.nameRU.toLowerCase().includes(searchParams.query.toLowerCase())));
  if (searchParams.isShort) {
    return filtredQueryArr.filter(movie => (movie.duration <= SHORTMOVIEDURATION))
  } else {
    return filtredQueryArr
  }
}
