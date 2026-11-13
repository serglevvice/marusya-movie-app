
export type RatingTone = "high" | "good" | "other" | "bad";

export function getRatingTone(rating: string): RatingTone {
  const value = Number(rating.replace(",", "."));
  if (!Number.isFinite(value)) return "other";
  if (value >= 8.5) return "high";
  if (value >= 7) return "good";
  if (value < 5) return "bad";
  return "other";
}
