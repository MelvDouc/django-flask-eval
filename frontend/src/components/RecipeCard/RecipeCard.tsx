import type { Recipe } from "$/types.ts";
import cssClasses from "./RecipeCard.module.scss";

export default function RecipeCard({ recipe }: {
  recipe: Recipe;
}) {
  return (
    <div className={cssClasses.RecipeCard}>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
      {recipe.music_genre && (
        <p>Music: {recipe.music_genre}</p>
      )}
    </div>
  );
}