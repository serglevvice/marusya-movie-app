import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../api/moviesApi";
import type { Movie } from "../../data/movies/types";
import { Icon } from "../Icon/Icon";
import { SearchResult } from "./SearchResult";
import "./Search.scss";

type SearchProps = {
  className?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
};

const MAX_RESULTS = 5;

function normalize(text: string) {
  return text.toLocaleLowerCase("ru-RU").replace(/ё/g, "е").trim();
}

export function Search({ className = "", autoFocus = false, onNavigate }: SearchProps) {
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLFormElement>(null);
  const requestVersionRef = useRef(0);
  const navigate = useNavigate();

  const normalizedQuery = normalize(query);

  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!normalizedQuery) return;
    let active = true;
    const requestVersion = requestVersionRef.current;
    const isCurrent = () => active && requestVersion === requestVersionRef.current;
    const timeout = window.setTimeout(() => {
      setLoading(true);
      setError("");
      getMovies({ title: normalizedQuery, count: MAX_RESULTS }).then((list) => {
        if (isCurrent()) setResults(list.slice(0, MAX_RESULTS));
      }).catch((cause: unknown) => {
        if (isCurrent()) setError(cause instanceof Error ? cause.message : "Не удалось найти фильмы");
      }).finally(() => { if (isCurrent()) setLoading(false); });
    }, 300);
    return () => { active = false; window.clearTimeout(timeout); };
  }, [normalizedQuery]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);

  const closeResults = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const resetAfterSelection = () => {
    requestVersionRef.current += 1;
    setResults([]);
    setQuery("");
    closeResults();
    onNavigate?.();
  };

  const goToMovie = (id: number) => {
    resetAfterSelection();
    navigate(`/movie/${id}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!results.length) return;
    const selectedMovie = results[activeIndex >= 0 ? activeIndex : 0];
    goToMovie(selectedMovie.id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      closeResults();
      return;
    }

    if (!results.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) =>
        index < 0 ? results.length - 1 : (index - 1 + results.length) % results.length,
      );
    }
  };

  const showDropdown = isOpen && Boolean(normalizedQuery);

  return (
    <form
      className={`search ${className}`.trim()}
      role="search"
      onSubmit={handleSubmit}
      ref={searchRef}
    >
      <label className="visually-hidden" htmlFor={inputId}>
        Поиск фильма
      </label>

      <Icon name="icon-search" className="search__icon" width={20} height={20} />

      <input
        className="search__input"
        id={inputId}
        autoFocus={autoFocus}
        type="text"
        placeholder="Поиск"
        autoComplete="off"
        value={query}
        onChange={(event) => {
          const value = event.target.value;
          requestVersionRef.current += 1;
          setQuery(value);
          setResults([]);
          setError("");
          setLoading(Boolean(normalize(value)));
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => {
          if (normalizedQuery) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />

      {showDropdown && (
        <div className="search__dropdown" id={resultsId}>
          {loading && <p className="search__empty" role="status">Ищем…</p>}
          {error && <p className="search__empty" role="alert">{error}</p>}
          {!loading && !error && results.length > 0 ? (
            <ul className="search__results" aria-label="Найденные фильмы">
              {results.map((movie, index) => (
                <li className="search__item" key={movie.id}>
                  <SearchResult
                    movie={movie}
                    active={index === activeIndex}
                    onHover={() => setActiveIndex(index)}
                    onSelect={resetAfterSelection}
                  />
                </li>
              ))}
            </ul>
          ) : !loading && !error ? (
            <p className="search__empty" role="status">
              Фильмы не найдены
            </p>
          ) : null}
        </div>
      )}
    </form>
  );
}
