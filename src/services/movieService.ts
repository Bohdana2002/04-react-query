import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3/search";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
//fixed mistake - added interface + added <MovieResponce>

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axios.get<MovieResponse>("/movie", {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return data.results;
};
