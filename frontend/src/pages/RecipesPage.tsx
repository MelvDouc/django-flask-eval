import CocktailRecipeList from "$/components/RecipeList/RecipeList";
import { getRecipes } from "$/utils/api.ts";

export default async function RecipesPage() {
  const result = await getRecipes(0, 10);

  if (!result.success)
    return (
      <p>{result.error}</p>
    );

  return (
    <CocktailRecipeList recipes={result.data} />
  );
}