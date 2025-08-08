import type { Recipe } from "$/types.ts";
import { Link } from "$/utils/Router.tsx";
import routes from "$/utils/routes.ts";
import cssClasses from "./RecipeList.module.scss";

export default function RecipeList({ recipes }: {
  recipes: Recipe[];
}) {
  return (
    <ul className={cssClasses.RecipeList}>
      {recipes.map((recipe) => (
        <li>
          <Link href={routes.RecipePage(recipe.id)}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  );
}