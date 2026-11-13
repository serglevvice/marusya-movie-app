import "./Footer.scss";

import { Icon } from "../Icon/Icon";

type FooterProps = {
  className?: string;
};

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`footer ${className}`}>
      <div className="footer__container">
        <ul className="footer__social-list">
          <li className="footer__social-item">
            <a className="footer__social-link" href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте (платформа VK)">
              <Icon
                name="icon-vk"
                className="footer__social-icon"
                width={36}
                height={36}
              />
            </a>
          </li>

          <li className="footer__social-item">
            <a className="footer__social-link" href="https://vkvideo.ru" target="_blank" rel="noopener noreferrer" aria-label="VK Видео (видеоплатформа VK)">
              <Icon
                name="icon-youtube"
                className="footer__social-icon"
                width={36}
                height={36}
              />
            </a>
          </li>

          <li className="footer__social-item">
            <a
              className="footer__social-link"
              href="https://ok.ru" target="_blank" rel="noopener noreferrer"
              aria-label="Одноклассники (платформа VK)"
            >
              <Icon
                name="icon-ok"
                className="footer__social-icon"
                width={36}
                height={36}
              />
            </a>
          </li>

          <li className="footer__social-item">
            <a className="footer__social-link" href="https://t.me/inside_vk" target="_blank" rel="noopener noreferrer" aria-label="Официальный Telegram-канал VK">
              <Icon
                name="icon-tg"
                className="footer__social-icon"
                width={36}
                height={36}
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
