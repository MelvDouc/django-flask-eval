import CocktailRecipeList from "$/components/CocktailRecipeList/CocktailRecipeList.tsx";
import { getCocktailRecipes } from "$/utils/api.ts";

export default async function CocktailsPage() {
  const result = await getCocktailRecipes(0, 10);

  if (!result.success)
    return (
      <p>{result.error}</p>
    );

  return (
    <CocktailRecipeList recipes={result.data} />
  );
}