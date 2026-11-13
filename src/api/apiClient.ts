const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "https://cinemaguide.skillbox.cc"
).replace(/\/+$/, "");

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown> | null;
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;
  const isJsonObject = body !== null && typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !ArrayBuffer.isView(body);

  const requestHeaders = new Headers(headers);
  if (isJsonObject && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/${path.replace(/^\/+/, "")}`, {
      ...rest,
      credentials: "include",
      headers: requestHeaders,
      body: isJsonObject ? JSON.stringify(body) : (body as BodyInit | null | undefined),
    });
  } catch {
    throw new ApiError(
      "Не удалось подключиться к CinemaGuide. Проверь сеть и доступ к API.", 0
    );
  }

  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get("Content-Type") ?? "";
  const payload: unknown = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = payload && typeof payload === "object"
      ? ("error" in payload && typeof payload.error === "string"
          ? payload.error
          : "message" in payload && typeof payload.message === "string"
            ? payload.message
            : null)
      : null;
    throw new ApiError(message || `Ошибка сервера (${response.status}).`, response.status);
  }

  return payload as T;
}
