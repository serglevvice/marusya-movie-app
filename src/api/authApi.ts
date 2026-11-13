import { apiRequest, ApiError } from "./apiClient";

export type UserProfile = {
  name: string;
  surname: string;
  email: string;
  favorites: string[];
};

type Result = { success?: boolean; result?: boolean };

export type LoginDetails = { email: string; password: string };
export type RegistrationDetails = LoginDetails & { name: string; surname: string };

function assertSuccess(result: Result, action: string): void {
  if (result?.success !== true && result?.result !== true) {
    throw new ApiError(`${action}: сервер не подтвердил запрос.`, 400);
  }
}

export async function loginRequest({ email, password }: LoginDetails): Promise<void> {
  const form = new URLSearchParams({ email, password });
  const result = await apiRequest<Result>("/auth/login", { method: "POST", body: form });
  assertSuccess(result, "Вход");
}

export async function registerRequest(data: RegistrationDetails): Promise<void> {
  const form = new URLSearchParams({
    email: data.email,
    password: data.password,
    name: data.name,
    surname: data.surname,
  });
  const result = await apiRequest<Result>("/user", { method: "POST", body: form });
  assertSuccess(result, "Регистрация");
}

export function getProfile(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/profile");
}

export async function logoutRequest(): Promise<void> {
  const result = await apiRequest<Result>("/auth/logout");
  assertSuccess(result, "Выход");
}
