import CocktailReadyAlert from "$/components/CocktailReadyAlert/CocktailReadyAlert.tsx";
import Nav from "$/components/Nav/Nav.tsx";
import HomePage from "$/pages/HomePage.tsx";
import RequestCocktailPage from "$/pages/RequestCocktailPage.tsx";
import routes from "$/utils/routes.ts";
import { Route, Router } from "$/utils/Router.tsx";

export default function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Router>
          <Route path={routes.Home} handler={HomePage} />
          <Route path={routes.RequestCocktail} handler={RequestCocktailPage} />
        </Router>
      </main>
      <CocktailReadyAlert />
    </>
  );
}