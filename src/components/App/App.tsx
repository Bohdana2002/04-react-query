import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setError(false); //added setError(false) so the state error resets before a new request
    setMovies([]); // resets before a new search
    try {
      setLoading(true);
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false); // removed setLoading from try since in finally, it will work in any case
    }
  };
  const openModalSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModalSelect = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />;{loading && <Loader />}
      {error && <ErrorMessage />}
      <Toaster />
      {movies.length > 0 && (
        <MovieGrid onSelect={openModalSelect} movies={movies} />
      )}
      {selectedMovie && (
        <MovieModal onClose={closeModalSelect} movie={selectedMovie} />
      )}
    </>
  );
};

export default App;
