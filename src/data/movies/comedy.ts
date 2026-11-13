import type { Movie } from "./types";

import homeAlonePosterWebp from "../../assets/images/posters/comedy/home-alone/home-alonePoster.webp";
import homeAlonePreview1Webp from "../../assets/images/posters/comedy/home-alone/home-alonePreview1.webp";
import homeAlonePreview2Webp from "../../assets/images/posters/comedy/home-alone/home-alonePreview2.webp";
import homeAlonePreview3Webp from "../../assets/images/posters/comedy/home-alone/home-alonePreview3.webp";
import cruellaPosterWebp from "../../assets/images/posters/comedy/cruella/cruellaPoster.webp";
import cruellaPreview1Webp from "../../assets/images/posters/comedy/cruella/cruellaPreview1.webp";
import cruellaPreview2Webp from "../../assets/images/posters/comedy/cruella/cruellaPreview2.webp";
import cruellaPreview3Webp from "../../assets/images/posters/comedy/cruella/cruellaPreview3.webp";
import dogPosterWebp from "../../assets/images/posters/comedy/dog/dogPoster.webp";
import dogPreview1Webp from "../../assets/images/posters/comedy/dog/dogPreview1.webp";
import dogPreview2Webp from "../../assets/images/posters/comedy/dog/dogPreview2.webp";
import dogPreview3Webp from "../../assets/images/posters/comedy/dog/dogPreview3.webp";
import grandBudapestHotelPosterWebp from "../../assets/images/posters/comedy/grand-budapest-hotel/grand-budapest-hotelPoster.webp";
import grandBudapestHotelPreview1Webp from "../../assets/images/posters/comedy/grand-budapest-hotel/grand-budapest-hotelPreview1.webp";
import grandBudapestHotelPreview2Webp from "../../assets/images/posters/comedy/grand-budapest-hotel/grand-budapest-hotelPreview2.webp";
import grandBudapestHotelPreview3Webp from "../../assets/images/posters/comedy/grand-budapest-hotel/grand-budapest-hotelPreview3.webp";
import knockOnMyDoorPosterWebp from "../../assets/images/posters/comedy/knock-on-my-door/knockOnMyDoorPoster.webp";
import knockOnMyDoorPreview1Webp from "../../assets/images/posters/comedy/knock-on-my-door/knockOnMyDoorPreview1.webp";
import knockOnMyDoorPreview2Webp from "../../assets/images/posters/comedy/knock-on-my-door/knockOnMyDoorPreview2.webp";
import knockOnMyDoorPreview3Webp from "../../assets/images/posters/comedy/knock-on-my-door/knockOnMyDoorPreview3.webp";
import whatDoMenTalkAboutPosterWebp from "../../assets/images/posters/comedy/what-do-men-talk-about/whatDoMenTalkAboutPoster.webp";
import whatDoMenTalkAboutPreview1Webp from "../../assets/images/posters/comedy/what-do-men-talk-about/whatDoMenTalkAboutPreview1.webp";
import whatDoMenTalkAboutPreview2Webp from "../../assets/images/posters/comedy/what-do-men-talk-about/whatDoMenTalkAboutPreview2.webp";
import whatDoMenTalkAboutPreview3Webp from "../../assets/images/posters/comedy/what-do-men-talk-about/whatDoMenTalkAboutPreview3.webp";
import whatWeDoInTheShadowsPosterWebp from "../../assets/images/posters/comedy/what-we-do-in-the-shadows/whatWeDoInTheShadowsPoster.webp";
import whatWeDoInTheShadowsPreview1Webp from "../../assets/images/posters/comedy/what-we-do-in-the-shadows/whatWeDoInTheShadowsPreview1.webp";
import whatWeDoInTheShadowsPreview2Webp from "../../assets/images/posters/comedy/what-we-do-in-the-shadows/whatWeDoInTheShadowsPreview2.webp";
import whatWeDoInTheShadowsPreview3Webp from "../../assets/images/posters/comedy/what-we-do-in-the-shadows/whatWeDoInTheShadowsPreview3.webp";

export const comedyMovies: Movie[] = [
  {
    id: 101,
    title: 'Один дома',
    genre: 'comedy',
    genreTitle: 'комедия',
    year: 1990,
    duration: '1 ч 43 мин',
    rating: '8,3',
    description: 'Американское семейство отправляется из Чикаго в Европу, но в спешке сборов бестолковые родители забывают дома... одного из своих детей. Юное создание, однако, не теряется и демонстрирует чудеса изобретательности. И когда в дом залезают грабители, им приходится не раз пожалеть о встрече с милым крошкой.',
    poster: homeAlonePosterWebp,
    posterWebp: homeAlonePosterWebp,
    previews: [
      {
        image: homeAlonePreview1Webp,
        alt: 'Кадр 1 из фильма Один дома',
      },
      {
        image: homeAlonePreview2Webp,
        alt: 'Кадр 2 из фильма Один дома',
      },
      {
        image: homeAlonePreview3Webp,
        alt: 'Кадр 3 из фильма Один дома',
      },
    ],
    trailerUrl: 'https://...',
    alt: 'Постер фильма Один дома',
  },
  {
    id: 102,
    title: 'Круэлла',
    genre: 'comedy',
    genreTitle: 'комедия',
    year: 2021,
    duration: '2 ч 14 мин',
    rating: '7,6',
    description: 'Великобритания, 1960-е годы. Эстелла была необычным ребёнком, и особенно трудно ей было мириться со всякого рода несправедливостью. Вылетев из очередной школы, она с мамой отправляется в Лондон. По дороге они заезжают в особняк известной модельерши по имени Баронесса, где в результате ужасного несчастного случая мама погибает. Добравшись до Лондона, Эстелла знакомится с двумя мальчишками — уличными мошенниками Джаспером и Хорасом. 10 лет спустя та же компания промышляет на улицах британской столицы мелким воровством, но Эстелла никак не может оставить мечту сделать карьеру в мире моды.Хитростью устроившись в фешенебельный универмаг, девушка привлекает внимание Баронессы, и та берёт её к себе в штат дизайнеров.',
    poster: cruellaPosterWebp,
    posterWebp: cruellaPosterWebp,
    previews: [
      {
        image: cruellaPreview1Webp,
        alt: 'Кадр 1 из фильма Круэлла',
      },
      {
        image: cruellaPreview2Webp,
        alt: 'Кадр 2 из фильма Круэлла',
      },
      {
        image: cruellaPreview3Webp,
        alt: 'Кадр 3 из фильма Круэлла',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/804662/video/172857/',
    alt: 'Постер фильма Круэлла',
  },
  {
    id: 103,
    title: 'Лулу и Бриггс',
    genre: 'comedy',
    genreTitle: 'комедия',
    year: 2021,
    duration: '1 ч 41 мин',
    rating: '7,4',
    description: 'Профессиональный военный Джексон Бриггс всеми силами пытается вернуться в строй, но из-за травмы головы получает постоянные отказы. Когда умирает один из его сослуживцев, Бриггсу дают задание: с военной базы в штате Вашингтон доставить на похороны в аризонский Ногалес боевую подругу почившего — нервную бельгийскую овчарку Лулу с целым спектром посттравматических расстройств. Поскольку собака боится летать, сделать это придётся на машине по Тихоокеанскому побережью, и эта поездка будет не самым простым заданием Бриггса.',
    poster: dogPosterWebp,
    posterWebp: dogPosterWebp,
    previews: [
      {
        image: dogPreview1Webp,
        alt: 'Кадр 1 из фильма Лулу и Бриггс',
      },
      {
        image: dogPreview2Webp,
        alt: 'Кадр 2 из фильма Лулу и Бриггс',
      },
      {
        image: dogPreview3Webp,
        alt: 'Кадр 3 из фильма Лулу и Бриггс',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/1355139/video/179588/',
    alt: 'Постер фильма Лулу и Бриггс',
  },
  {
    id: 104,
    title: 'Отель «Гранд Будапешт»',
    genre: 'comedy',
    genreTitle: 'комедия',
    year: 2014,
    duration: '1 ч 40 мин',
    rating: '8,0',
    description: 'Фильм рассказывает об увлекательных приключениях легендарного консьержа Густава и его юного друга, портье Зеро Мустафы. Сотрудники гостиницы становятся свидетелями кражи и поисков бесценных картин эпохи Возрождения, борьбы за огромное состояние богатой семьи и… драматических изменений в Европе между двумя кровопролитными войнами XX века.',
    poster: grandBudapestHotelPosterWebp,
    posterWebp: grandBudapestHotelPosterWebp,
    previews: [
      {
        image: grandBudapestHotelPreview1Webp,
        alt: 'Кадр 1 из фильма Отель «Гранд Будапешт»',
      },
      {
        image: grandBudapestHotelPreview2Webp,
        alt: 'Кадр 2 из фильма Отель «Гранд Будапешт»',
      },
      {
        image: grandBudapestHotelPreview3Webp,
        alt: 'Кадр 3 из фильма Отель «Гранд Будапешт»',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/683999/video/94943/',
    alt: 'Постер фильма Отель «Гранд Будапешт»',
  },
  {
    id: 105,
    title: 'Постучись в мою Тверь',
    genre: 'comedy',
    genreTitle: 'комедия',
    year: 2024,
    duration: '1 ч 30 мин',
    rating: '7,1',
    description: 'Городская фифа Алиса приезжает в Тверь, чтобы получить земельный участок на местной ферме. Но владелец Сергей, известный своим скверным характером, не желает его отдавать, несмотря на все её уловки. Не собирается сдаваться и Алиса, решив преодолеть все трудности деревенской жизни.',
    poster: knockOnMyDoorPosterWebp,
    posterWebp: knockOnMyDoorPosterWebp,
    previews: [
      {
        image: knockOnMyDoorPreview1Webp,
        alt: 'Кадр 1 из фильма Постучись в мою Тверь',
      },
      {
        image: knockOnMyDoorPreview2Webp,
        alt: 'Кадр 2 из фильма Постучись в мою Тверь',
      },
      {
        image: knockOnMyDoorPreview3Webp,
        alt: 'Кадр 3 из фильма Постучись в мою Тверь',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/5428537/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма Постучись в мою Тверь',
  },
  {
    id: 106,
    title: 'О чём говорят мужчины',
    genre: 'comedy',
    genreTitle: 'комедия',
    year: 2010,
    duration: '1 ч 33 мин',
    rating: '7,9',
    description: 'О чем говорят мужчины? Конечно, о женщинах. Нет, еще о работе, о деньгах, о машинах, о футболе,… но в основном, все-таки, о женщинах. А уж если у них впереди два дня, которые они, вырвавшись из офисов и семей, уехав от всех забот и обязательств, проведут в дороге – два дня, насыщенные событиями и приключениями – то можете быть уверены, что за это время они успеют обсудить немало тем… И еще.Из этих разговоров – это мы точно знаем – многие женщины узнают о себе очень много нового...',
    poster: whatDoMenTalkAboutPosterWebp,
    posterWebp: whatDoMenTalkAboutPosterWebp,
    previews: [
      {
        image: whatDoMenTalkAboutPreview1Webp,
        alt: 'Кадр 1 из фильма О чём говорят мужчины',
      },
      {
        image: whatDoMenTalkAboutPreview2Webp,
        alt: 'Кадр 2 из фильма О чём говорят мужчины',
      },
      {
        image: whatDoMenTalkAboutPreview3Webp,
        alt: 'Кадр 3 из фильма О чём говорят мужчины',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/468102/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма О чём говорят мужчины',
  },
  {
    id: 107,
    title: 'Реальные упыри',
    genre: 'comedy',
    genreTitle: 'комедия',
    year: 2014,
    duration: '1 ч 25 мин',
    rating: '7,5',
    description: 'О чем говорят мужчины? Конечно, о женщинах. Нет, еще о работе, о деньгах, о машинах, о футболе,… но в основном, все-таки, о женщинах. А уж если у них впереди два дня, которые они, вырвавшись из офисов и семей, уехав от всех забот и обязательств, проведут в дороге – два дня, насыщенные событиями и приключениями – то можете быть уверены, что за это время они успеют обсудить немало тем… И еще.Из этих разговоров – это мы точно знаем – многие женщины узнают о себе очень много нового...',
    poster: whatWeDoInTheShadowsPosterWebp,
    posterWebp: whatWeDoInTheShadowsPosterWebp,
    previews: [
      {
        image: whatWeDoInTheShadowsPreview1Webp,
        alt: 'Кадр 1 из фильма Реальные упыри',
      },
      {
        image: whatWeDoInTheShadowsPreview2Webp,
        alt: 'Кадр 2 из фильма Реальные упыри',
      },
      {
        image: whatWeDoInTheShadowsPreview3Webp,
        alt: 'Кадр 3 из фильма Реальные упыри',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/818981/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма Реальные упыри',
  },
];
