import React from "react";
import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import type { ViewMode } from "./FilterBar";

interface MovieListProps {
  movies: Movie[];
  view: ViewMode;
  onToggleFavorite: (id: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, view, onToggleFavorite }) => {
  if (movies.length === 0) {
    return <div className="empty">Фильмов нет</div>;
  }

  return (
    <section className={view === "grid" ? "grid" : "list"} aria-live="polite">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onToggleFavorite={onToggleFavorite} view={view} />
      ))}
    </section>
  );
};

export default MovieList;
