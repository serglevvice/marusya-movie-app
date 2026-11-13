import { useState, type FormEvent } from "react";
import { Icon } from "../Icon/Icon";
import { useAuth } from "../../hooks/useAuth";
import { ApiError } from "../../api/apiClient";
import { isValidEmail, sanitizeEmailInput } from "../../utils/emailValidation";

type LoginFormProps = {
  onRegister: () => void;
  onSuccess: () => void;
  initialEmail?: string;
};

function getLoginErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) {
    return "Не удалось войти. Попробуйте ещё раз.";
  }

  switch (error.status) {
    case 400:
    case 401:
    case 403:
      return "Неверная электронная почта или пароль. Проверьте данные и попробуйте снова.";
    case 429:
      return "Слишком много попыток входа. Попробуйте позже.";
    case 0:
      return "Не удалось подключиться к серверу. Проверьте интернет-соединение.";
    default:
      return error.status >= 500
        ? "Сервис временно недоступен. Попробуйте позже."
        : "Не удалось войти. Попробуйте ещё раз.";
  }
}

export function LoginForm({
  onRegister,
  onSuccess,
  initialEmail = "",
}: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState(initialEmail);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const password = String(
      new FormData(event.currentTarget).get("password") || "",
    );
    const normalizedEmail = email.trim();

    if (!isValidEmail(normalizedEmail)) {
      setFeedback(
        "Введите корректный email латиницей, например name@example.ru",
      );
      return;
    }
    if (!password) {
      setFeedback("Введите пароль.");
      return;
    }

    setSubmitting(true);
    setFeedback("");
    try {
      await login({ email: normalizedEmail, password });
      onSuccess();
    } catch (error) {
      setFeedback(getLoginErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login__form-wrap login__form-wrap--login">
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <div className="login__field">
          <label className="visually-hidden" htmlFor="login-email">
            Электронная почта
          </label>
          <Icon
            name="icon-email"
            className="login__field-icon"
            width={22}
            height={18}
          />
          <input
            className="login__input"
            id="login-email"
            name="email"
            type="email"
            placeholder="Электронная почта"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={254}
            required
            value={email}
            onChange={(event) => {
              setEmail(sanitizeEmailInput(event.target.value));
              setFeedback("");
            }}
          />
        </div>
        <div className="login__field">
          <label className="visually-hidden" htmlFor="login-password">
            Пароль
          </label>
          <Icon
            name="icon-password"
            className="login__field-icon"
            width={22}
            height={12}
          />
          <input
            className="login__input"
            id="login-password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            required
            onChange={() => setFeedback("")}
          />
        </div>
        {feedback && (
          <p className="login__feedback" role="alert">
            {feedback}
          </p>
        )}
        <div className="login__actions">
          <button
            className="login__enter-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Входим…" : "Войти"}
          </button>
          <button
            className="login__register-button"
            type="button"
            onClick={onRegister}
            disabled={submitting}
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
}
