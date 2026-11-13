import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginModal } from "../../components/LoginModal/LoginModal";
import { FavoritesList } from "../../components/FavoritesList/FavoritesList";
import "./FavoritesPage.scss";

export function FavoritesPage() {
  const { user, loading } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <section className="favorites-page">
      <h1 className="favorites-page__title">Избранное</h1>
      {loading ? <p>Проверяем сессию…</p> : !user ? (
        <div className="favorites-page__empty">
          <p>Чтобы сохранять фильмы, войдите в аккаунт.</p>
          <button type="button" onClick={() => setLoginOpen(true)}>Войти</button>
        </div>
      ) : (
        <>
          <FavoritesList />
          <Link className="favorites-page__link" to="/genres">Посмотреть жанры</Link>
        </>
      )}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)}/>}
    </section>
  );
}
