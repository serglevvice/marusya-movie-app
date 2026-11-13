<div align="center">

# 🎬 Marusya

### A responsive movie discovery app

Explore films, browse genres, watch trailers, and build your personal watchlist.

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Sass-CC6699?logo=sass&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)

**Frontend diploma project · Russian-language interface · English documentation**

**Live demo:** Coming after deployment

</div>

---

## About the project

**Marusya** is a single-page movie catalogue built with **React, TypeScript, Vite and SCSS**. It connects to the **CinemaGuide API** for movies, genres, user accounts, and server-side favorites. Selected film imagery and translated metadata are bundled locally to improve presentation and support Russian-language search and content.

The project focuses on real user flows, component organization, responsive layouts, predictable API error handling, accessible interactions, and production performance.

## Features

- **Movie discovery** — a featured random movie, a “try another” action, and a Top 10 movie selection.
- **Search** — debounced API requests (300 ms), a dropdown showing up to five matches, keyboard navigation, and search with Russian/English titles where localized mappings exist.
- **Genres** — browse categories, view rating-sorted film listings, and load more results in batches.
- **Return to where you left off** — genre pages remember loaded batches and scroll position when opening a movie and navigating back within the same app tab.
- **Movie details** — descriptions, ratings, release information, available production facts, and image galleries/previews.
- **Trailers** — an in-page modal with YouTube playback where a trailer is available.
- **Accounts** — registration, email/password validation, a registration confirmation step, sign-in, sign-out, and profile settings.
- **Favorites** — add/remove films with server-side persistence, immediate UI feedback, and rollback if a request fails; login is required.
- **Responsive UI** — dedicated mobile navigation/search, adaptive cards, responsive text and layouts, plus image fallbacks.
- **Usability & accessibility** — semantic navigation, labels for interactive elements, keyboard-operable dialogs, visible loading/error states, and skeleton placeholders.

## Technology

| Area | Stack |
| --- | --- |
| UI | React 19, TypeScript 6 |
| Tooling | Vite 8, ESLint |
| Routing | React Router 7 |
| Styling | SCSS (Sass), responsive CSS |
| Data | CinemaGuide REST API via Fetch |
| State | React Context, hooks, component state |
| Images | Local WebP/JPEG assets, API images, lazy loading and fallback posters |

## Routes

| URL | Page |
| --- | --- |
| `/` | Random featured movie + Top 10 |
| `/genres` | Genre catalogue |
| `/genres/:genre` | Movies filtered by genre |
| `/movie/:id` | Movie details |
| `/account` | Profile, favorites, and account settings |
| `/favorites` | Favorites page |
| Other paths | Not-found page |

## Performance & Lighthouse

Audited on **November 12, 2026** with **Lighthouse 13.5.0**, using the local **production preview** at `http://localhost:4173`. Six page states were tested on **desktop** and **mobile**, for 12 reports in total.

| Page / audit | Route | Desktop performance | Mobile performance |
| --- | --- | ---: | ---: |
| Home | `/` | **97** | **87** |
| Genres | `/genres` | **99** | **99** |
| Genre listing | `/genres/drama` | **96** | **86** |
| Movie details | `/movie/27` | **100** | **85** |
| Account — audit 1 | `/account` | **97** | **86** |
| Account — audit 2 | `/account` | **98** | **81** |

**Across all 12 audits:**

- **Accessibility: 100/100**
- **SEO: 100/100**
- **Best Practices: 77/100** — Lighthouse reported warnings associated with third-party cookies (`koa.sess` and `koa.sess.sig`) and Chrome DevTools issues from the external CinemaGuide API.
- **Desktop performance: 96–100**; **mobile performance: 81–99** (individual audits above).
- Layout shift was close to zero in these runs. Mobile LCP still varies by page and external image loading.

> **Testing notes:** These are lab scores from a local production build, **not** measurements of a deployed site or real-user Core Web Vitals. Mobile audits included a Lighthouse warning that installed Chrome extensions may have affected loading performance. Scores can change with browser, device, network, API response, and content.

<details>
<summary><strong>Full Lighthouse HTML reports (12 files)</strong></summary>

The original reports are stored in `docs/lighthouse/` and can be opened locally in a browser after downloading the files.

| Page | Desktop | Mobile |
| --- | --- | --- |
| Home | [Desktop HTML](docs/lighthouse/desktop-home.html) | [Mobile HTML](docs/lighthouse/mobile-home.html) |
| Genres | [Desktop HTML](docs/lighthouse/desktop-genres.html) | [Mobile HTML](docs/lighthouse/mobile-genres.html) |
| Genre listing | [Desktop HTML](docs/lighthouse/desktop-genre-drama.html) | [Mobile HTML](docs/lighthouse/mobile-genre-drama.html) |
| Movie details | [Desktop HTML](docs/lighthouse/desktop-movie-27.html) | [Mobile HTML](docs/lighthouse/mobile-movie-27.html) |
| Account — audit 1 | [Desktop HTML](docs/lighthouse/desktop-account-01.html) | [Mobile HTML](docs/lighthouse/mobile-account-01.html) |
| Account — audit 2 | [Desktop HTML](docs/lighthouse/desktop-account-02.html) | [Mobile HTML](docs/lighthouse/mobile-account-02.html) |

</details>

## Quality & engineering decisions

- Split API access, response normalization, localized content, UI components, pages, and state providers into separate modules.
- Handle network failures, validation, unauthenticated sessions, and unavailable poster/trailer resources without breaking the interface.
- Use lazy-loaded posters, image dimensions, skeletons and selective high-priority loading to reduce layout instability and improve perceived performance.
- Prevent horizontal overflow on smaller screens and handle long movie titles/descriptions without compromising layout.
- Preserve keyboard focus and support Escape/Tab handling in interactive dialogs.
- Validate the project with **ESLint**, **TypeScript build checks**, manual functional testing, and Lighthouse (rather than claiming an automated test suite).

## Getting started

**Requirements:** Node.js version compatible with Vite 8, and npm.

```bash
# Install exact dependencies from the lockfile
npm ci

# Start the development server
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`).

### Production build and checks

```bash
npm run lint
npm run build
npm run preview
```

The build script runs `tsc -b && vite build` and outputs the production site to `dist/`. `npm run preview` serves the built site locally.

### API configuration

The default backend is **[CinemaGuide API](https://cinemaguide.skillbox.cc)**. To override it, create a `.env.local` file in the project root:

```dotenv
VITE_API_BASE_URL=https://cinemaguide.skillbox.cc
```

Authentication uses session cookies (`credentials: 'include'`). Some browsers block or partition third-party cookies, so authenticated features may depend on browser settings and the API server's CORS/cookie policies. The API and its availability are maintained externally.

### Deployment note

Because this app uses **React Router** with client-side routes, configure the hosting service to serve `index.html` for unknown app URLs. Otherwise, refreshing a nested route such as `/movie/27` may result in a server-side 404. This also needs to be checked after deploying.

## Project structure

```text
src/
├── api/           # HTTP client, requests, data adaptation/localization
├── app/           # Router and app providers
├── assets/        # Fonts, images, icons
├── components/    # Reusable UI, auth modal, search, posters, trailers
├── context/       # Authentication and favorites state
├── data/          # Genre definitions and local film content
├── hooks/         # Reusable state hooks
├── layouts/       # Shared page layout
├── pages/         # Route-level screens
├── styles/        # Global SCSS styles
└── utils/         # Validation and formatting helpers
```

## Credits & notes

- Developed as a frontend diploma / learning project based on a supplied design and the external CinemaGuide API.
- Film metadata, artwork, and trailers are used to demonstrate the interface and belong to their respective rights holders.
- Third-party code notices are recorded in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
- The app is a movie discovery interface; it does **not** host or stream feature films.
