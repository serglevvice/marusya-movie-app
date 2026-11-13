
export type TrailerSource = {
  embedUrl: string;
  watchUrl: string;
};

export function getTrailerSource(rawUrl: string | undefined | null): TrailerSource | null {
  if (!rawUrl) return null;

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  if (url.protocol !== "https:") return null;
  const host = url.hostname.toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);

  if (
    host === "youtube.com" || host === "www.youtube.com" ||
    host === "m.youtube.com" || host === "youtu.be" ||
    host === "www.youtube-nocookie.com" || host === "youtube-nocookie.com"
  ) {
    const id = host === "youtu.be"
      ? parts[0]
      : url.pathname === "/watch"
        ? url.searchParams.get("v")
        : ["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : null;

    if (!id || !/^[\w-]{11}$/.test(id)) return null;
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
      watchUrl: `https://www.youtube.com/watch?v=${id}`,
    };
  }

  if (host === "rutube.ru" || host === "www.rutube.ru") {
    const id = parts[0] === "video"
      ? parts[1]
      : parts[0] === "play" && parts[1] === "embed" ? parts[2] : null;
    if (!id || !/^[a-f0-9]{32}$/i.test(id)) return null;
    return {
      embedUrl: `https://rutube.ru/play/embed/${id}`,
      watchUrl: `https://rutube.ru/video/${id}/`,
    };
  }

  return null;
}
