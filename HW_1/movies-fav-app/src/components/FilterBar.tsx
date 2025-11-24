import React, { RefObject } from "react";

export type FilterMode = "all" | "favorites";
export type ViewMode = "grid" | "list";

interface FilterBarProps {
  filterMode: FilterMode;
  onChangeFilter: (mode: FilterMode) => void;

  viewMode: ViewMode;
  onChangeView: (mode: ViewMode) => void;

  searchInputRef: RefObject<HTMLInputElement>;
  onSearchInputChange: () => void; // триггерит ререндер, но само значение живёт в ref
  onClearSearch: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterMode,
  onChangeFilter,
  viewMode,
  onChangeView,
  searchInputRef,
  onSearchInputChange,
  onClearSearch,
}) => {
  return (
    <div className="controls" role="region" aria-label="Панель фильтров">
      <button
        className={`btn ${filterMode === "all" ? "active" : ""}`}
        onClick={() => onChangeFilter("all")}
      >
        Все
      </button>
      <button
        className={`btn ${filterMode === "favorites" ? "active" : ""}`}
        onClick={() => onChangeFilter("favorites")}
      >
        Только избранные
      </button>

      <input
        ref={searchInputRef}
        className="input"
        type="text"
        placeholder="Поиск по названию…"
        onChange={onSearchInputChange}
        aria-label="Поиск по названию"
      />
      <button className="btn" onClick={onClearSearch} aria-label="Очистить поиск">
        Очистить
      </button>

      <button
        className={`btn ${viewMode === "grid" ? "active" : ""}`}
        onClick={() => onChangeView("grid")}
        title="Плитка"
        aria-pressed={viewMode === "grid"}
      >
        Плитка
      </button>
      <button
        className={`btn ${viewMode === "list" ? "active" : ""}`}
        onClick={() => onChangeView("list")}
        title="Список"
        aria-pressed={viewMode === "list"}
      >
        Список
      </button>
    </div>
  );
};

export default FilterBar;
