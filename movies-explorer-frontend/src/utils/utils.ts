import { IMovie } from "../components/Movies/Movies";

export function filterMovies(searchQuery: string, movies: IMovie[]) {
  return movies.filter((movie) => (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())))
}
