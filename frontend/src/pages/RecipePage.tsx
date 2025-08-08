import RecipeCard from "$/components/RecipeCard/RecipeCard.tsx";
import type { AsyncResult, Recipe } from "$/types.ts";
import { getSavedRecipe } from "$/utils/api.ts";
import { addRecipe, getRecipeById } from "$/utils/db.ts";

export default async function RecipePage({ id }: {
  id: string;
}) {
  const result = await getOrAddRecipe(+id);

  if (!result.success)
    return (
      <p>{result.error}</p>
    );

  return (
    <>
      <RecipeCard recipe={result.data} />
    </>
  );
}

async function getOrAddRecipe(id: number): AsyncResult<Recipe, string> {
  const recipe = await getRecipeById(id);

  if (recipe)
    return { success: true, data: recipe };

  const result = await getSavedRecipe(id);

  if (result.success)
    await addRecipe(result.data);

  return result;
}