import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FavoritesList } from "../../components/FavoritesList/FavoritesList";
import { Icon } from "../../components/Icon/Icon";
import "./AccountPage.scss";

type Tab = "favorites" | "settings";

export function AccountPage() {
  const { user, loading, sessionError, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("favorites");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (working) return;
    setWorking(true);
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Не удалось выйти.");
    } finally {
      setWorking(false);
    }
  };

  if (loading)
    return (
      <section className="account-page">
        <h1>Проверяем сессию…</h1>
      </section>
    );
  if (!user)
    return (
      <section className="account-page">
        <h1>Мой аккаунт</h1>
        <p>{sessionError || "Войдите в аккаунт, чтобы просмотреть профиль."}</p>
        <Link to="/">На главную</Link>
      </section>
    );

  const initials =
    `${user.name?.[0] || ""}${user.surname?.[0] || ""}`.toUpperCase();
  return (
    <section className="account-page">
      <h1 className="account-page__title">Мой аккаунт</h1>
      <div
        className="account-page__tabs"
        role="tablist"
        aria-label="Разделы аккаунта"
      >
        <button
          className={`account-page__tab${tab === "favorites" ? " account-page__tab--active" : ""}`}
          type="button"
          role="tab"
          id="account-tab-favorites"
          aria-controls="account-panel-favorites"
          aria-selected={tab === "favorites"}
          onClick={() => setTab("favorites")}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.7L12 21l8.8-8.7a5.4 5.4 0 0 0 0-7.7Z" />
          </svg>
          <span className="account-page__tab-full">Избранные фильмы</span>
          <span className="account-page__tab-short">Избранное</span>
        </button>
        <button
          className={`account-page__tab${tab === "settings" ? " account-page__tab--active" : ""}`}
          type="button"
          role="tab"
          id="account-tab-settings"
          aria-controls="account-panel-settings"
          aria-selected={tab === "settings"}
          onClick={() => setTab("settings")}
        >
          <Icon name="icon-name" width={24} height={24} />
          <span className="account-page__tab-full">Настройка аккаунта</span>
          <span className="account-page__tab-short">Настройки</span>
        </button>
      </div>
      {tab === "favorites" ? (
        <div
          className="account-page__panel"
          role="tabpanel"
          id="account-panel-favorites"
          aria-labelledby="account-tab-favorites"
        >
          <FavoritesList />
        </div>
      ) : (
        <div
          className="account-page__panel account-page__settings"
          role="tabpanel"
          id="account-panel-settings"
          aria-labelledby="account-tab-settings"
        >
          <div className="account-page__detail">
            <span className="account-page__avatar" aria-hidden="true">
              {initials}
            </span>
            <div className="account-page__detail-content">
              <span className="account-page__label">Имя Фамилия</span>
              <strong className="account-page__value">
                {user.name} {user.surname}
              </strong>
            </div>
          </div>
          <div className="account-page__detail account-page__detail--second">
            <span className="account-page__avatar" aria-hidden="true">
              <Icon name="icon-email" width={28} height={28} />
            </span>
            <div className="account-page__detail-content">
              <span className="account-page__label">Электронная почта</span>
              <strong className="account-page__value">{user.email}</strong>
            </div>
          </div>
          {error && (
            <p className="account-page__error" role="alert">
              {error}
            </p>
          )}
          <button
            className="account-page__logout"
            type="button"
            onClick={handleLogout}
            disabled={working}
          >
            {working ? "Выходим…" : "Выйти из аккаунта"}
          </button>
        </div>
      )}
    </section>
  );
}
