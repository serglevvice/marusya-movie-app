
import "./MainLayout.scss";

import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

export function MainLayout() {
  return (
    <main className="page">
      <Header />

      <Outlet />

      <Footer className="page__footer" />
    </main>
  );
}
