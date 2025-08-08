import Nav from "$/components/Nav/Nav.tsx";
import RecipeAlert from "$/components/RecipeAlert/RecipeAlert.tsx";
import HomePage from "$/pages/HomePage.tsx";
import RecipePage from "$/pages/RecipePage.tsx";
import RecipeRequestPage from "$/pages/RecipeRequestPage.tsx";
import RecipesPage from "$/pages/RecipesPage";
import { Route, Router } from "$/utils/Router.tsx";
import routes from "$/utils/routes.ts";
import cssClasses from "./App.module.scss";

export default function App() {
  return (
    <div className={cssClasses.App}>
      <header>
        <Nav />
      </header>
      <main>
        <Router>
          <Route path={routes.Home} handler={HomePage} />
          <Route path={routes.RecipesPage} handler={RecipesPage} />
          <Route path="/recipes/@/:id" handler={RecipePage} />
          <Route path={routes.RecipeRequest} handler={RecipeRequestPage} />
        </Router>
      </main>
      <RecipeAlert />
    </div>
  );
}