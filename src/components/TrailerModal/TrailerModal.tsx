import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { TrailerSource } from "./trailerUrls";
import "./TrailerModal.scss";

type TrailerModalProps = {
  title: string;
  source: TrailerSource;
  onClose: () => void;
  posterUrl?: string;
};

function getYouTubeId(value: string): string | null {
  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");

    let id: string | null = null;

    if (hostname === "youtu.be") {
      id = url.pathname.split("/")[1] || null;
    }

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtube-nocookie.com"
    ) {
      id =
        url.searchParams.get("v") ??
        url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ??
        null;
    }

    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

function getAutoplayUrl(value: string): string {
  try {
    const url = new URL(value);

    url.searchParams.set("autoplay", "1");
    url.searchParams.set("playsinline", "1");

    return url.toString();
  } catch {
    return value;
  }
}

export function TrailerModal({
  title,
  source,
  onClose,
  posterUrl,
}: TrailerModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [imageStep, setImageStep] = useState(0);

  const videoId =
    getYouTubeId(source.embedUrl) ?? getYouTubeId(source.watchUrl);

  const previewImages = [
    ...(posterUrl ? [posterUrl] : []),

    ...(videoId
      ? [
          `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        ]
      : []),
  ];

  const previewImage = previewImages[imageStep] ?? null;

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "Tab" && dialogRef.current) {
        const elements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href], iframe",
          ),
        );

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="trailer-modal__backdrop"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <section
        className="trailer-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Трейлер: ${title}`}
        ref={dialogRef}
      >
        <div className="trailer-modal__player">
          {!isPlaying && previewImage ? (
            <>
              <button
                className="trailer-modal__preview"
                type="button"
                aria-label={`Воспроизвести трейлер фильма «${title}»`}
                onClick={() => setIsPlaying(true)}
              >
                <img
                  className="trailer-modal__poster"
                  src={previewImage}
                  alt=""
                  onError={() => {
                    setImageStep((step) => step + 1);
                  }}
                />

                <span className="trailer-modal__play" aria-hidden="true">
                  <svg
                    width="26"
                    height="31"
                    viewBox="0 0 26 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 28.9885V1.66933C0 0.360283 1.43992 -0.437801 2.55 0.255999L24.4053 13.9156C25.4498 14.5683 25.4498 16.0895 24.4053 16.7423L2.55 30.4018C1.43992 31.0956 0 30.2976 0 28.9885Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>

              <h2 className="trailer-modal__title">{title}</h2>
            </>
          ) : (
            <iframe
              src={getAutoplayUrl(source.embedUrl)}
              title={`Трейлер: ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>

        <button
          ref={closeButtonRef}
          className="trailer-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть трейлер"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 5L19 19M19 5L5 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </section>
    </div>,
    document.body,
  );
}
