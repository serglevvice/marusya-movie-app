import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./LoginModal.scss";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { RegisterSuccess } from "./RegisterSuccess";
import { Icon } from "../Icon/Icon";

import marusyaBlackPng from "../../assets/images/logo/marusya-black.png";
import marusyaBlackPng2x from "../../assets/images/logo/marusya-black@2x.png";
import marusyaBlackWebp from "../../assets/images/logo/marusya-black.webp";
import marusyaBlackWebp2x from "../../assets/images/logo/marusya-black@2x.webp";

type LoginModalProps = { onClose: () => void };
type AuthView = "login" | "register" | "registerSuccess";

export function LoginModal({ onClose }: LoginModalProps) {
  const [view, setView] = useState<AuthView>("login");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled])'
        )
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>("input, button");
    firstFocusable?.focus();
  }, [view]);

  return createPortal(
    <div
      className="login-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`login ${view === "registerSuccess" ? "login--success" : ""}`}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={
          view === "login"
            ? "Вход в Марусю"
            : view === "register"
              ? "Регистрация в Марусе"
              : "Регистрация завершена"
        }
      >
        <a className="login__logo" href="/" aria-label="Маруся">
          <picture className="login__img">
            <source
              type="image/webp"
              srcSet={`${marusyaBlackWebp} 1x, ${marusyaBlackWebp2x} 2x`}
            />
            <img
              className="login__logo-img"
              src={marusyaBlackPng}
              srcSet={`${marusyaBlackPng2x} 2x`}
              width="157"
              height="35"
              alt="Маруся"
            />
          </picture>
        </a>

        {view === "login" ? (
          <LoginForm
            key={`login-${registeredEmail}`}
            initialEmail={registeredEmail}
            onRegister={() => setView("register")}
            onSuccess={onClose}
          />
        ) : view === "register" ? (
          <RegisterForm
            onLogin={() => setView("login")}
            onSuccess={(email) => {
              setRegisteredEmail(email);
              setView("registerSuccess");
            }}
          />
        ) : (
          <RegisterSuccess onLogin={() => setView("login")} />
        )}

        <button
          className="login__close-button"
          type="button"
          aria-label="Закрыть окно авторизации"
          onClick={onClose}
        >
          <Icon name="icon-x" className="login__icon-close" width={19} height={19} />
        </button>
      </div>
    </div>,
    document.body
  );
}
