import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";
//pagination
// import ReactPaginateModule from "react-paginate";
// import type { ReactPaginateProps } from "react-paginate";
// import type { ComponentType } from "react";

// type ModuleWithDefault<T> = { default: T };

// const ReactPaginate = (
//   ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
// ).default;

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: movies = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: query !== "",
  });
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };
  useEffect(() => {
    if (!isError && !isLoading && query !== "" && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [movies, query, isLoading, isError]);
  const openModalSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModalSelect = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
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
