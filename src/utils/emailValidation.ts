/** Email-address restrictions for CinemaGuide: ASCII, @ and a public-looking domain. */
const EMAIL_PATTERN =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9]+(?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9]+(?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,24}$/;

export function sanitizeEmailInput(value: string): string {
  // Do not allow Cyrillic or other non-ASCII characters, including when pasting.
  return value.replace(/[^\x20-\x7E]/g, "");
}

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  const localPart = email.split("@")[0] ?? "";

  return (
    email === value &&
    email.length <= 254 &&
    localPart.length <= 64 &&
    !localPart.startsWith(".") &&
    !localPart.endsWith(".") &&
    !localPart.includes("..") &&
    EMAIL_PATTERN.test(email)
  );
}
