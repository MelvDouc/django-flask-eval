import RecipeAlert from "$/components/RecipeAlert/RecipeAlert";
import Nav from "$/components/Nav/Nav.tsx";
import HomePage from "$/pages/HomePage.tsx";
import RecipeRequestPage from "$/pages/RecipeRequestPage";
import routes from "$/utils/routes.ts";
import { Route, Router } from "$/utils/Router.tsx";
import RecipesPage from "$/pages/RecipesPage";
import RecipePage from "$/pages/RecipePage.tsx";

export default function App() {
  return (
    <>
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
    </>
  );
}