import { useState, type FormEvent } from "react";
import { Icon } from "../Icon/Icon";
import { useAuth } from "../../hooks/useAuth";
import { ApiError } from "../../api/apiClient";
import { isValidEmail, sanitizeEmailInput } from "../../utils/emailValidation";

type RegisterFormProps = {
  onLogin: () => void;
  onSuccess: (email: string) => void;
};

function getRegistrationErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) {
    return "Не удалось зарегистрироваться. Попробуйте ещё раз.";
  }

  switch (error.status) {
    case 409:
      return "Сервер сообщает, что такой email уже зарегистрирован. Попробуйте войти или укажите другой адрес.";
    case 400:
      return "Проверьте введённые данные и попробуйте ещё раз.";
    case 429:
      return "Слишком много попыток. Попробуйте зарегистрироваться позже.";
    case 0:
      return "Не удалось подключиться к серверу. Проверьте интернет-соединение.";
    default:
      return error.status >= 500
        ? "Ошибка сервера. Попробуйте зарегистрироваться позже."
        : "Не удалось зарегистрироваться. Попробуйте ещё раз.";
  }
}

export function RegisterForm({ onLogin, onSuccess }: RegisterFormProps) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const normalizedEmail = email.trim();
    if (!isValidEmail(normalizedEmail)) {
      setFeedback("Введите корректный email латиницей, например name@example.com.");
      return;
    }
    if (password.length < 8) {
      setFeedback("Пароль должен содержать не менее 8 символов.");
      return;
    }
    if (password !== confirmation) {
      setFeedback("Пароли не совпадают. Проверьте введённые значения.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const surname = String(formData.get("surname") || "").trim();
    if (!name || !surname) {
      setFeedback("Введите имя и фамилию.");
      return;
    }
    setSubmitting(true);
    setFeedback("");
    try {
      await register({
        email: normalizedEmail,
        password,
        name,
        surname,
      });
      onSuccess(normalizedEmail);
    } catch (error) {
      setFeedback(getRegistrationErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login__form-wrap login__form-wrap--register">
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <div className="login__field">
          <label className="visually-hidden" htmlFor="register-email">Электронная почта</label>
          <Icon name="icon-email" className="login__field-icon" width={22} height={18} />
          <input className="login__input" id="register-email" name="email" type="email"
            placeholder="Электронная почта" autoComplete="email" inputMode="email"
            autoCapitalize="none" spellCheck={false} maxLength={254} required
            value={email}
            onChange={(event) => {
              setEmail(sanitizeEmailInput(event.target.value));
              setFeedback("");
            }} />
        </div>
        <div className="login__field">
          <label className="visually-hidden" htmlFor="register-name">Имя</label>
          <Icon name="icon-name" className="login__field-icon" width={16} height={21} />
          <input className="login__input" id="register-name" name="name" type="text"
            placeholder="Имя" autoComplete="given-name" required
            onChange={() => setFeedback("")} />
        </div>
        <div className="login__field">
          <label className="visually-hidden" htmlFor="register-surname">Фамилия</label>
          <Icon name="icon-name" className="login__field-icon" width={16} height={21} />
          <input className="login__input" id="register-surname" name="surname" type="text"
            placeholder="Фамилия" autoComplete="family-name" required
            onChange={() => setFeedback("")} />
        </div>
        <div className="login__field">
          <label className="visually-hidden" htmlFor="register-password">Пароль</label>
          <Icon name="icon-password" className="login__field-icon" width={22} height={12} />
          <input className="login__input" id="register-password" name="password" type="password"
            placeholder="Пароль (от 8 символов)" autoComplete="new-password"
            minLength={8} required value={password}
            onChange={(event) => { setPassword(event.target.value); setFeedback(""); }} />
        </div>
        <div className="login__field">
          <label className="visually-hidden" htmlFor="register-password-confirm">Подтвердите пароль</label>
          <Icon name="icon-password" className="login__field-icon" width={22} height={12} />
          <input className="login__input" id="register-password-confirm" name="passwordConfirm"
            type="password" placeholder="Подтвердите пароль" autoComplete="new-password"
            minLength={8} required value={confirmation}
            onChange={(event) => { setConfirmation(event.target.value); setFeedback(""); }} />
        </div>
        {feedback && <p className="login__feedback" role="alert">{feedback}</p>}
        <div className="login__actions">
          <button className="login__enter-button" type="submit" disabled={submitting}>
            {submitting ? "Регистрируем…" : "Создать аккаунт"}
          </button>
          <button className="login__register-button" type="button" onClick={onLogin}
            disabled={submitting}>У меня есть аккаунт</button>
        </div>
      </form>
    </div>
  );
}
