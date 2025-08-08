import CocktailRecipeList from "$/components/RecipeList/RecipeList";
import { getRecipes } from "$/utils/api.ts";
import { Link } from "$/utils/Router.tsx";
import routes from "$/utils/routes.ts";

export default async function RecipesPage() {
  const { start, end } = getRange();
  const result = await getRecipes(start, end);

  if (!result.success)
    return (
      <p>{result.error}</p>
    );

  const recipes = result.data;

  if (recipes.length === 0)
    return (
      <p>No recipes to show. <Link href={routes.RecipeRequest}>Request one.</Link></p>
    );

  return (
    <>
      <h1>List of recipes</h1>
      <CocktailRecipeList recipes={recipes} />
      {recipes.length >= 10 && (
        <p><Link href={`${routes.RecipesPage}?start=${end}&end=${end + 10}`}>Next 10</Link></p>
      )}
    </>
  );
}

function getRange(): { start: number; end: number; } {
  const searchParams = new URLSearchParams(window.location.search);
  const start = Number(searchParams.get("start"));
  const end = Number(searchParams.get("end"));

  if (isNaN(start) || isNaN(end) || end <= start)
    return { start: 0, end: 10 };

  return { start, end };
}