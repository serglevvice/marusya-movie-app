import "./HomePage-loading.scss";
import { Hero } from "../../components/Hero/Hero";
import { TopFilms } from "../../components/TopFilms/TopFilms";

export function HomePage() {
  return (
    <>
      <Hero className="home-page__hero" />
      <TopFilms className="home-page__top" />
    </>
  );
}
