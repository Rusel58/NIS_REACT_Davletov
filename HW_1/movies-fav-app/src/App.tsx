import React, { useMemo, useRef, useState } from "react";
import { Movie } from "./types/movie";
import FilterBar, { FilterMode, ViewMode } from "./components/FilterBar";
import MovieList from "./components/MovieList";

const initialMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    posterUrl: "https://avatars.mds.yandex.net/i?id=0c8cee7910e3fa863e71f60573cc50b2_l-5754725-images-thumbs&n=13",
    isFavorite: false,
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    posterUrl: "https://i.pinimg.com/736x/61/dd/84/61dd8433a296be1a2a163b5d471b7974.jpg",
    isFavorite: true,
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmQ0ZmNkMzUtMmUwOS00Y2IwLTg1ZTctNzM1MWU1YTAwMzMzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Parasite",
    year: 2019,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BM2U0YmZjZjctYjk0Zi00OGQ5LWFlMmYtOTZjZDE2NzM4YjFlXkEyXkFqcGc@._V1_.jpg",
    isFavorite: false,
  },
  {
    id: 5,
    title: "The Matrix",
    year: 1999,
    posterUrl: "https://avatars.mds.yandex.net/get-mpic/4902598/2a0000019206de4aa6bf931c19baf8029518/orig",
    isFavorite: true,
  }
];

const App: React.FC = () => {
  // храним список и даём переключать избранное (useState)
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  // фильтр "все/избранные"
  const [filterMode, setFilterMode] = useState<FilterMode>("all");

  // режим отображения "плитка/список"
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // поиск по названию — значение в useRef (требование)
  const searchInputRef = useRef<HTMLInputElement>(null);
  // отдельный тикер, чтобы реактивно фильтровать (ref сам по себе ререндер не вызовет)
  const [searchTick, setSearchTick] = useState<number>(0);

  const toggleFavorite = (id: number) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  const handleSearchChange = () => {
    // значение хранится в ref; здесь просто триггерим ререндер
    setSearchTick((t) => t + 1);
  };

  const handleClearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      setSearchTick((t) => t + 1);
    }
  };

  const visibleMovies = useMemo(() => {
    const q = (searchInputRef.current?.value ?? "").toLowerCase().trim();

    let list = movies;
    if (filterMode === "favorites") {
      list = list.filter((m) => m.isFavorite);
    }

    if (q.length > 0) {
      list = list.filter((m) => m.title.toLowerCase().includes(q));
    }

    return list;
    // searchTick в зависимостях — чтобы пересчитать при наборе текста
  }, [movies, filterMode, searchTick]);

  return (
    <div className="container">
      <header className="header">
        <div className="title">🎬 Movies</div>
      </header>

      <FilterBar
        filterMode={filterMode}
        onChangeFilter={setFilterMode}
        viewMode={viewMode}
        onChangeView={setViewMode}
        searchInputRef={searchInputRef}
        onSearchInputChange={handleSearchChange}
        onClearSearch={handleClearSearch}
      />

      <MovieList movies={visibleMovies} view={viewMode} onToggleFavorite={toggleFavorite} />
    </div>
  );
};

export default App;
