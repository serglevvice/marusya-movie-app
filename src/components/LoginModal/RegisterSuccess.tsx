type RegisterSuccessProps = {
  onLogin: () => void;
};

export function RegisterSuccess({ onLogin }: RegisterSuccessProps) {
  return (
    <div className="login__form-wrap login__form-wrap--complete">
      <div className="login__complete">
        <h2 className="login__title">Регистрация завершена</h2>
        <p className="login__text">
          Используйте вашу электронную почту для входа
        </p>
      </div>

      <div className="login__actions">
        <button className="login__enter-button" type="button" onClick={onLogin}>
          Войти
        </button>
      </div>
    </div>
  );
}
