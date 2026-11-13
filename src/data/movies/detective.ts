import type { Movie } from "./types";

import redSilkPosterJpg from "../../assets/images/posters/detective/red-silk/red-silkPoster.jpg";
import redSilkPosterWebp from "../../assets/images/posters/detective/red-silk/red-silkPoster.webp";
import redSilkPreview1Jpg from "../../assets/images/posters/detective/red-silk/red-silkPreview1.jpg";
import redSilkPreview1Webp from "../../assets/images/posters/detective/red-silk/red-silkPreview1.webp";
import redSilkPreview2Jpg from "../../assets/images/posters/detective/red-silk/red-silkPreview2.jpg";
import redSilkPreview2Webp from "../../assets/images/posters/detective/red-silk/red-silkPreview2.webp";
import redSilkPreview3Jpg from "../../assets/images/posters/detective/red-silk/red-silkPreview3.jpg";
import redSilkPreview3Webp from "../../assets/images/posters/detective/red-silk/red-silkPreview3.webp";
import redSilkPreview4Jpg from "../../assets/images/posters/detective/red-silk/red-silkPreview4.jpg";
import redSilkPreview4Webp from "../../assets/images/posters/detective/red-silk/red-silkPreview4.webp";
import redSilkPreview5Jpg from "../../assets/images/posters/detective/red-silk/red-silkPreview5.jpg";
import redSilkPreview5Webp from "../../assets/images/posters/detective/red-silk/red-silkPreview5.webp";
import airportPosterWebp from "../../assets/images/posters/detective/airport/airportPoster.webp";
import psyAntinomyPosterWebp from "../../assets/images/posters/detective/psy-antinomy/psy-antinomyPoster.webp";
import chameleonEffectPosterWebp from "../../assets/images/posters/detective/chameleon-effect/chameleon-effectPoster.webp";
import chameleonEffectPreview1Webp from "../../assets/images/posters/detective/chameleon-effect/chameleon-effectPreview1.webp";
import chameleonEffectPreview2Webp from "../../assets/images/posters/detective/chameleon-effect/chameleon-effectPreview2.webp";
import chameleonEffectPreview3Webp from "../../assets/images/posters/detective/chameleon-effect/chameleon-effectPreview3.webp";

export const detectiveMovies: Movie[] = [
  {
    id: 201,
    title: 'Красный шёлк',
    genre: 'detective',
    genreTitle: 'детектив',
    year: 2025,
    duration: '2 ч 26 мин',
    rating: '7,2',
    description: '1927 год. Транссибирский экспресс. Через всю Россию перевозят секретные документы, которые определят будущее СССР и Китая. Под видом обычных пассажиров скрываются иностранные разведчики и настоящие головорезы, готовые на всё ради документов. Молодому красноармейцу и бывшему царскому агенту приходится объединиться, чтобы раскрыть общего врага.',
    poster: redSilkPosterJpg,
    posterWebp: redSilkPosterWebp,
    previews: [
      {
        image: redSilkPreview1Jpg,
        imageWebp: redSilkPreview1Webp,
        alt: 'Кадр 1 из фильма Красный шёлк',
      },
      {
        image: redSilkPreview2Jpg,
        imageWebp: redSilkPreview2Webp,
        alt: 'Кадр 2 из фильма Красный шёлк',
      },
      {
        image: redSilkPreview3Jpg,
        imageWebp: redSilkPreview3Webp,
        alt: 'Кадр 3 из фильма Красный шёлк',
      },
      {
        image: redSilkPreview4Jpg,
        imageWebp: redSilkPreview4Webp,
        alt: 'Кадр 4 из фильма Красный шёлк',
      },
      {
        image: redSilkPreview5Jpg,
        imageWebp: redSilkPreview5Webp,
        alt: 'Кадр 5 из фильма Красный шёлк',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/5364350/',
    alt: 'Постер фильма Красный шёлк',
  },
  {
    id: 202,
    title: 'Аэропорт',
    genre: 'detective',
    genreTitle: 'детектив',
    year: 2026,
    duration: '1 ч 33 мин',
    rating: '5,4',
    description: 'Девять пассажиров рейса Пермь — Анталья оказываются в зоне пограничного контроля аэропорта. Двери заблокированы, связь с внешним миром отсутствует. На первый взгляд — случайное стечение обстоятельств. Но опытный трукрайм-энтузиаст Владимир уверен, что совпадений быть не может.',
    poster: airportPosterWebp,
    posterWebp: airportPosterWebp,
    previews: [],
    trailerUrl: 'https://www.kinopoisk.ru/film/7045507/',
    alt: 'Постер фильма Аэропорт',
  },
  {
    id: 203,
    title: 'PSY Антиномия',
    genre: 'detective',
    genreTitle: 'детектив',
    year: 2025,
    duration: '1 ч 45 мин',
    rating: '6,8',
    description: 'Двое молодых следователей ведут расследование кровавого убийства. В деле много нестыковок и тайн. Пытаясь найти ответы на сложные вопросы, коллеги подозревают, что сами стали марионетками в чьей-то продуманной игре…',
    poster: psyAntinomyPosterWebp,
    posterWebp: psyAntinomyPosterWebp,
    previews: [],
    trailerUrl: 'https://www.kinopoisk.ru/film/5270198/',
    alt: 'Постер фильма PSY Антиномия',
  },
  {
    id: 204,
    title: 'Эффект хамелеона',
    genre: 'detective',
    genreTitle: 'детектив',
    year: 2025,
    duration: '1 ч 36 мин',
    rating: '5,9',
    description: 'Единственным свидетелем убийства невесты капитана полиции Артёма Ненашева стала умная колонка с голосовым ассистентом. В последние минуты своей жизни Юля, с её помощью, смогла зашифровать имя преступника. Ненашев вскрывает опечатанную квартиру, чтобы разгадать ребус в виде цветного освещения жилища, выйти на след убийцы и доказать свою невиновность.',
    poster: chameleonEffectPosterWebp,
    posterWebp: chameleonEffectPosterWebp,
    previews: [
      {
        image: chameleonEffectPreview1Webp,
        alt: 'Кадр 1 из фильма Эффект хамелеона',
      },
      {
        image: chameleonEffectPreview2Webp,
        alt: 'Кадр 2 из фильма Эффект хамелеона',
      },
      {
        image: chameleonEffectPreview3Webp,
        alt: 'Кадр 3 из фильма Эффект хамелеона',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/6143321/',
    alt: 'Постер фильма Эффект хамелеона',
  },
];
