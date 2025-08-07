import type { Recipe } from "$/types.ts";
import { Link } from "$/utils/Router.tsx";
import routes from "$/utils/routes.ts";
import cssClasses from "./CocktailRecipeList.module.scss";

export default function CocktailRecipeList({ recipes }: {
  recipes: Recipe[];
}) {
  return (
    <ul className={cssClasses.CocktailRecipeList}>
      {recipes.map((recipe) => (
        <li>
          <Link href={routes.CocktailPage(recipe.id)}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  );
}