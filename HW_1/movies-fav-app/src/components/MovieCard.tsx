import React from "react";
import { Movie } from "../types/movie";
import type { ViewMode } from "./FilterBar";

interface MovieCardProps {
  movie: Movie;
  onToggleFavorite: (id: number) => void;
  view: ViewMode;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onToggleFavorite, view }) => {
  const { id, title, year, posterUrl, isFavorite } = movie;

  return (
    <article className={`card ${view}`} aria-label={title}>
      <img
        src={posterUrl}
        alt={`Постер фильма ${title}`}
        className={`poster ${view === "list" ? "list" : ""}`}
        loading="lazy"
      />
      <div className="card-body">
        <div className="card-head">
          <div>
            <div className="movie-title">{title}</div>
            <div className="movie-year">{year}</div>
          </div>
          <button
            className="star"
            aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(id)}
            title="Избранное"
          >
            {isFavorite ? "⭐" : "☆"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
