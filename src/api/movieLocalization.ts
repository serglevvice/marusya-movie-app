

export type LocalizedFilm = { title: string; description?: string };

export const localizedFilms: Record<string, LocalizedFilm> = {
  "monsters, inc.": {
    title: "Корпорация монстров",
    description: "Монстры Салли и Майк работают на фабрике детских страхов. Всё меняется, когда в их мир случайно попадает маленькая девочка Бу.",
  },
  "the good german": {
    title: "Хороший немец",
    description: "Американский журналист приезжает в послевоенный Берлин и оказывается втянут в загадочное убийство и политические интриги. Расследование приводит его к бывшей возлюбленной.",
  },
  "home alone": { title: "Один дома" },
  "home alone 2: lost in new york": { title: "Один дома 2: Затерянный в Нью-Йорке" },
  "cruella": { title: "Круэлла" },
  "the grand budapest hotel": { title: "Отель «Гранд Будапешт»" },
  "uncharted": { title: "Анчартед: На картах не значится" },
  "everest": { title: "Эверест" },
  "the aeronauts": { title: "Аэронавты" },
  "dog": { title: "Лулу и Бриггс" },
  "what we do in the shadows": { title: "Реальные упыри" },
  "spirit untamed": { title: "Спирит Непокорный" },
  "the lion king": { title: "Король Лев" },
  "the dark knight": { title: "Тёмный рыцарь" },
  "the matrix": { title: "Матрица" },
  "the shawshank redemption": { title: "Побег из Шоушенка" },
  "the green mile": { title: "Зелёная миля" },
  "forrest gump": { title: "Форрест Гамп" },
  "interstellar": { title: "Интерстеллар" },
  "inception": { title: "Начало" },
  "the lord of the rings: the fellowship of the ring": { title: "Властелин колец: Братство кольца" },
  "the lord of the rings: the two towers": { title: "Властелин колец: Две крепости" },
  "the lord of the rings: the return of the king": { title: "Властелин колец: Возвращение короля" },
  "the godfather": { title: "Крёстный отец" },
  "pulp fiction": { title: "Криминальное чтиво" },
  "fight club": { title: "Бойцовский клуб" },
  "titanic": { title: "Титаник" },
  "avatar": { title: "Аватар" },
  "ratatouille": { title: "Рататуй" },
  "finding nemo": { title: "В поисках Немо" },
  "toy story": { title: "История игрушек" },
  "shrek": { title: "Шрек" },
  "frozen": { title: "Холодное сердце" },
  "the incredibles": { title: "Суперсемейка" },
  "up": { title: "Вверх" },
  "wall-e": { title: "ВАЛЛ·И" },
  "coco": { title: "Тайна Коко" },
  "the prestige": { title: "Престиж" },
  "the silence of the lambs": { title: "Молчание ягнят" },
  "the departed": { title: "Отступники" },
};

export const genresInRussian: Record<string, string> = {
  action: "боевик", adventure: "приключения", animation: "мультфильм",
  comedy: "комедия", crime: "криминал", documentary: "документальный",
  drama: "драма", family: "семейный", fantasy: "фэнтези",
  history: "исторический", horror: "ужасы", music: "музыка",
  mystery: "детектив", romance: "мелодрама", "science fiction": "фантастика",
  "sci-fi": "фантастика", thriller: "триллер", war: "военный",
  western: "вестерн", detective: "детектив", tv: "телефильм",
  "tv movie": "телефильм", "science-fiction": "фантастика",
};

export function getLocalizedFilm(englishTitle: string): LocalizedFilm | undefined {
  return localizedFilms[englishTitle.trim().toLowerCase()];
}

export function translateGenre(genre: string): string {
  return genresInRussian[genre.trim().toLowerCase()] ?? genre;
}

export function resolveSearchTitle(title: string): string {
  const query = title.toLocaleLowerCase("ru").replace(/ё/g, "е").trim();
  if (!/[а-я]/i.test(query)) return title;
  const entry = Object.entries(localizedFilms).find(([, value]) =>
    value.title.toLocaleLowerCase("ru").replace(/ё/g, "е").includes(query),
  );
  return entry?.[0] ?? title;
}
