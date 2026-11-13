import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title">
      <h1 id="not-found-title">Страница не найдена</h1>
      <p>Возможно, ссылка устарела или адрес указан с ошибкой.</p>
      <Link to="/">Вернуться на главную</Link>
    </section>
  );
}
