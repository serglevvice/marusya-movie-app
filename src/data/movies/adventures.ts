import type { Movie } from "./types";

import unchartedPosterWebp from "../../assets/images/posters/adventures/uncharted/unchartedPoster.webp";
import unchartedPreview1Webp from "../../assets/images/posters/adventures/uncharted/unchartedPreview1.webp";
import unchartedPreview2Webp from "../../assets/images/posters/adventures/uncharted/unchartedPreview2.webp";
import unchartedPreview3Webp from "../../assets/images/posters/adventures/uncharted/unchartedPreview3.webp";
import everestPosterWebp from "../../assets/images/posters/adventures/everest/everestPoster.webp";
import everestPreview1Webp from "../../assets/images/posters/adventures/everest/everestPreview1.webp";
import everestPreview2Webp from "../../assets/images/posters/adventures/everest/everestPreview2.webp";
import everestPreview3Webp from "../../assets/images/posters/adventures/everest/everestPreview3.webp";
import teddyAdventuresPosterWebp from "../../assets/images/posters/adventures/teddy-adventures/teddyAdventuresPoster.webp";
import teddyAdventuresPreview1Webp from "../../assets/images/posters/adventures/teddy-adventures/teddyAdventuresPreview1.webp";
import teddyAdventuresPreview2Webp from "../../assets/images/posters/adventures/teddy-adventures/teddyAdventuresPreview2.webp";
import teddyAdventuresPreview3Webp from "../../assets/images/posters/adventures/teddy-adventures/teddyAdventuresPreview3.webp";
import northPolePosterWebp from "../../assets/images/posters/adventures/north-pole/northPolePoster.webp";
import northPolePreview1Webp from "../../assets/images/posters/adventures/north-pole/northPolePreview1.webp";
import northPolePreview2Webp from "../../assets/images/posters/adventures/north-pole/northPolePreview2.webp";
import northPolePreview3Webp from "../../assets/images/posters/adventures/north-pole/northPolePreview3.webp";
import silverstarPosterWebp from "../../assets/images/posters/adventures/silverstar/silverstarPoster.webp";
import silverstarPreview1Webp from "../../assets/images/posters/adventures/silverstar/silverstarPreview1.webp";
import silverstarPreview2Webp from "../../assets/images/posters/adventures/silverstar/silverstarPreview2.webp";
import silverstarPreview3Webp from "../../assets/images/posters/adventures/silverstar/silverstarPreview3.webp";
import aeronautsPosterWebp from "../../assets/images/posters/adventures/aeronauts/aeronautsPoster.webp";
import aeronautsPreview1Webp from "../../assets/images/posters/adventures/aeronauts/aeronautsPreview1.webp";
import aeronautsPreview2Webp from "../../assets/images/posters/adventures/aeronauts/aeronautsPreview2.webp";
import aeronautsPreview3Webp from "../../assets/images/posters/adventures/aeronauts/aeronautsPreview3.webp";
import doggoneAdventurePosterWebp from "../../assets/images/posters/adventures/doggone-adventure/doggoneAdventurePoster.webp";
import doggoneAdventurePreview1Jpg from "../../assets/images/posters/adventures/doggone-adventure/doggoneAdventurePreview1.jpg";
import doggoneAdventurePreview2Webp from "../../assets/images/posters/adventures/doggone-adventure/doggoneAdventurePreview2.webp";
import doggoneAdventurePreview3Webp from "../../assets/images/posters/adventures/doggone-adventure/doggoneAdventurePreview3.webp";

export const adventuresMovies: Movie[] = [
  {
    id: 701,
    title: 'Анчартед: На картах не значится',
    genre: 'adventures',
    genreTitle: 'приключения',
    year: 2022,
    duration: '1 ч 55 мин',
    rating: '6,8',
    description: 'Нейтан Дрейк не видел старшего брата Сэма 15 лет, с тех пор как тот сбежал из сиротского приюта. Парень работает барменом и промышляет мелким воровством, когда на него выходит Виктор Салливан по прозвищу Салли и предлагает отправиться на поиски давно потерянных сокровищ Магеллана. Узнав, что Салли знаком с Сэмом, Нейтан соглашается на авантюру, надеясь также отыскать и брата.',
    poster: unchartedPosterWebp,
    posterWebp: unchartedPosterWebp,
    previews: [
      {
        image: unchartedPreview1Webp,
        alt: 'Кадр 1 из фильма Анчартед: На картах не значится',
      },
      {
        image: unchartedPreview2Webp,
        alt: 'Кадр 2 из фильма Анчартед: На картах не значится',
      },
      {
        image: unchartedPreview3Webp,
        alt: 'Кадр 3 из фильма Анчартед: На картах не значится',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/468373/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма Анчартед: На картах не значится',
  },
  {
    id: 702,
    title: 'Эверест',
    genre: 'adventures',
    genreTitle: 'приключения',
    year: 2015,
    duration: '2 ч 01 мин',
    rating: '7,2',
    description: 'Эверест — великая неприступная гора, покорить вершину которой мечтают многие профессиональные альпинисты. Одна из экспедиций на ее вершину закончилась настоящей трагедией, однако этот факт не останавливает отважных альпинистов.Опытный инструктор Роб Холл, собрав группу из лучших альпинистов, собирается совершить восхождение на самую высокую вершину планеты. Все эти люди полны мужества и отваги и они не остановятся ни перед чем, пока не поднимутся на вершину Эвереста. Но даже если эта гора покорится им, смогут ли они вернуться обратно живыми и невредимыми?',
    poster: everestPosterWebp,
    posterWebp: everestPosterWebp,
    previews: [
      {
        image: everestPreview1Webp,
        alt: 'Кадр 1 из фильма Эверест',
      },
      {
        image: everestPreview2Webp,
        alt: 'Кадр 2 из фильма Эверест',
      },
      {
        image: everestPreview3Webp,
        alt: 'Кадр 3 из фильма Эверест',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/739642/video/123575/',
    alt: 'Постер фильма Эверест',
  },
  {
    id: 703,
    title: 'Приключения Тедди',
    genre: 'adventures',
    genreTitle: 'приключения',
    year: 2022,
    duration: '1 ч 16 мин',
    rating: '7,6',
    description: 'На рождественской ярмарке Марианна замечает ожившую игрушку — плюшевого медвежонка Тедди. Это то, о чем она мечтала всю жизнь! Однако медвежонка выигрывает другой: теперь Тедди и его новый лучший друг, ежик Болла, отправятся в новогоднее путешествие, полное приключений, чтобы вернуться к девочке.',
    poster: teddyAdventuresPosterWebp,
    posterWebp: teddyAdventuresPosterWebp,
    previews: [
      {
        image: teddyAdventuresPreview1Webp,
        alt: 'Кадр 1 из фильма Приключения Тедди',
      },
      {
        image: teddyAdventuresPreview2Webp,
        alt: 'Кадр 2 из фильма Приключения Тедди',
      },
      {
        image: teddyAdventuresPreview3Webp,
        alt: 'Кадр 3 из фильма Приключения Тедди',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/5003054/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма Приключения Тедди',
  },
  {
    id: 704,
    title: 'Северный полюс',
    genre: 'adventures',
    genreTitle: 'приключения',
    year: 2025,
    duration: '2 ч 00 мин',
    rating: '6,9',
    description: 'Начало 1960-х, период обострения противостояния СССР и США. В сложнейших погодных условиях и с неисправностями на борту первая советская атомная подводная лодка К-3 отправляется в поход подо льдами Северного Ледовитого океана, чтобы всплыть ровно на Северном полюсе.',
    poster: northPolePosterWebp,
    posterWebp: northPolePosterWebp,
    previews: [
      {
        image: northPolePreview1Webp,
        alt: 'Кадр 1 из фильма Северный полюс',
      },
      {
        image: northPolePreview2Webp,
        alt: 'Кадр 2 из фильма Северный полюс',
      },
      {
        image: northPolePreview3Webp,
        alt: 'Кадр 3 из фильма Северный полюс',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/5274400/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма Северный полюс',
  },
  {
    id: 705,
    title: 'Спирит',
    genre: 'adventures',
    genreTitle: 'приключения',
    year: 2022,
    duration: '1 ч 26 мин',
    rating: '7,7',
    description: 'Эсми гостит у бабушки и все, о чем она грезит — это занятия конным спортом. Однако, бабушка боится этого увлечения и не разрешает. Однажды утром девочка обнаруживает у себя во дворе лошадь, которая спаслась из пожара в конюшне на соседнем ранчо. Так начинается настоящая дружба и приключения.',
    poster: silverstarPosterWebp,
    posterWebp: silverstarPosterWebp,
    previews: [
      {
        image: silverstarPreview1Webp,
        alt: 'Кадр 1 из фильма Спирит',
      },
      {
        image: silverstarPreview2Webp,
        alt: 'Кадр 2 из фильма Спирит',
      },
      {
        image: silverstarPreview3Webp,
        alt: 'Кадр 3 из фильма Спирит',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/4646180/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма Спирит',
  },
  {
    id: 706,
    title: 'Аэронавты',
    genre: 'adventures',
    genreTitle: 'приключения',
    year: 2019,
    duration: '1 ч 40 мин',
    rating: '6,6',
    description: 'Лондон, 1862 год. Она — очаровательная богатая молодая женщина, увлечённая управлением воздушными шарами. Он — исследователь-метеоролог, готовый на всё, чтобы совершить научный прорыв, и ему позарез нужно подняться как можно выше. Вдвоем они отправляются в отчаянное путешествие на аэростате, через бури и грозы на край неизведанного мира, о котором человечество может только гадать — туда, где ещё не был ни один человек.',
    poster: aeronautsPosterWebp,
    posterWebp: aeronautsPosterWebp,
    previews: [
      {
        image: aeronautsPreview1Webp,
        alt: 'Кадр 1 из фильма Аэронавты',
      },
      {
        image: aeronautsPreview2Webp,
        alt: 'Кадр 2 из фильма Аэронавты',
      },
      {
        image: aeronautsPreview3Webp,
        alt: 'Кадр 3 из фильма Аэронавты',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/1108495/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма Аэронавты',
  },
  {
    id: 707,
    title: 'Пушистый переполох',
    genre: 'adventures',
    genreTitle: 'приключения',
    year: 2018,
    duration: '1 ч 24 мин',
    rating: '8,5',
    description: 'Джек-рассел-терьер по кличке Мёрфи вырос в секретном научном центре и обладает сверхъестественной способностью: он умеет общаться с людьми. Однажды его находят дети, увлеченные расследованием таинственных происшествий. Теперь молодым детективам и говорящему псу предстоит не только разгадать тайну заброшенного поместья на окраине города, но и выяснить, как же Мёрфи научился разговаривать и куда исчез его предыдущий хозяин.',
    poster: doggoneAdventurePosterWebp,
    posterWebp: doggoneAdventurePosterWebp,
    previews: [
      {
        image: doggoneAdventurePreview1Jpg,
        alt: 'Кадр 1 из фильма Пушистый переполох',
      },
      {
        image: doggoneAdventurePreview2Webp,
        alt: 'Кадр 2 из фильма Пушистый переполох',
      },
      {
        image: doggoneAdventurePreview3Webp,
        alt: 'Кадр 3 из фильма Пушистый переполох',
      },
    ],
    trailerUrl: 'https://www.kinopoisk.ru/film/1071827/?socialAlias=MzQyMjU4NDQ%3D',
    alt: 'Постер фильма Пушистый переполох',
  },
];
