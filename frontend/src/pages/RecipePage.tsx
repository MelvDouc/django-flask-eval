import RecipeCard from "$/components/RecipeCard/RecipeCard.tsx";
import { getSavedRecipe } from "$/utils/api.ts";

export default async function RecipePage({ id }: {
  id: string;
}) {
  const result = await getSavedRecipe(+id);

  if (!result.success)
    return (
      <p>{result.error}</p>
    );

  return (
    <div>
      <RecipeCard recipe={result.data} />
    </div>
  );
}