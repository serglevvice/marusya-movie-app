import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Header.scss";
import { Search } from "../Search/Search";
import { LoginModal } from "../LoginModal/LoginModal";

import marusyaWhitePng from "../../assets/images/logo/marusya-white.png";
import marusyaWhitePng2x from "../../assets/images/logo/marusya-white@2x.png";
import marusyaWhiteWebp from "../../assets/images/logo/marusya-white.webp";
import marusyaWhiteWebp2x from "../../assets/images/logo/marusya-white@2x.webp";

export function Header() {
  const { pathname } = useLocation();
  return <HeaderContent key={pathname} />;
}

function HeaderContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!isMobileSearchOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileSearchOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobileSearchOpen]);

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link className="header__logo" to="/" aria-label="Маруся — главная">
            <picture className="header__img">
              <source
                type="image/webp"
                srcSet={`${marusyaWhiteWebp} 1x, ${marusyaWhiteWebp2x} 2x`}
              />
              <img
                className="header__logo-img"
                src={marusyaWhitePng}
                srcSet={`${marusyaWhitePng2x} 2x`}
                width="143"
                height="32"
                alt="Маруся"
              />
            </picture>
          </Link>

          <div className="header__explore">
            <nav className="header__nav" aria-label="Основная навигация">
              <NavLink className={({ isActive }) => `header__nav-link${isActive ? " header__nav-link--active" : ""}`} to="/" end>
                Главная
              </NavLink>
              <NavLink className={({ isActive }) => `header__nav-link${isActive ? " header__nav-link--active" : ""}`} to="/genres">
                Жанры
              </NavLink>
            </nav>
            <Search className="header__search" />
          </div>

          <div className="header__login">
            {user ? (
              <NavLink className={({ isActive }) => `header__login-button${isActive ? " header__login-button--active" : ""}`} to="/account">
                {user.surname}
              </NavLink>
            ) : (
              <button
                className="header__login-button"
                type="button"
                onClick={() => setIsLoginOpen(true)}
                disabled={loading}
              >
                {loading ? "Проверяем…" : "Войти"}
              </button>
            )}
          </div>

          <nav className="header__mobile-nav" aria-label="Мобильная навигация">
            <NavLink className="header__mobile-action" to="/genres" aria-label="Жанры" title="Жанры">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="2" />
                <rect x="14" y="3" width="7" height="7" rx="2" />
                <rect x="3" y="14" width="7" height="7" rx="2" />
                <rect x="14" y="14" width="7" height="7" rx="2" />
              </svg>
            </NavLink>
            <button
              className="header__mobile-action"
              type="button"
              aria-label={isMobileSearchOpen ? "Закрыть поиск" : "Открыть поиск"}
              aria-expanded={isMobileSearchOpen}
              onClick={() => setIsMobileSearchOpen((open) => !open)}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="7.8" />
                <path d="m16.7 16.7 5 5" />
              </svg>
            </button>
            {user ? (
              <NavLink className="header__mobile-action" to="/account" aria-label="Мой аккаунт" title="Мой аккаунт">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M4.5 22v-2.5a7.5 7.5 0 0 1 15 0V22" />
                </svg>
              </NavLink>
            ) : (
              <button className="header__mobile-action" type="button" onClick={() => setIsLoginOpen(true)} disabled={loading} aria-label="Войти" title="Войти">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M4.5 22v-2.5a7.5 7.5 0 0 1 15 0V22" />
                </svg>
              </button>
            )}
          </nav>
        </div>
      </header>

      {isMobileSearchOpen && (
        <>
          <button className="header__search-backdrop" type="button" aria-label="Закрыть поиск" onClick={() => setIsMobileSearchOpen(false)} />
          <div className="header__mobile-search-panel">
            <Search className="header__mobile-search" autoFocus onNavigate={() => setIsMobileSearchOpen(false)} />
            <button className="header__search-close" type="button" onClick={() => setIsMobileSearchOpen(false)} aria-label="Закрыть поиск">×</button>
          </div>
        </>
      )}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </>
  );
}
