import type { Recipe } from "$/types.ts";
import cssClasses from "./RecipeCard.module.scss";

export default function RecipeCard({ recipe }: {
  recipe: Recipe;
}) {
  return (
    <div className={cssClasses.RecipeCard}>
      <h1 className={cssClasses.Name}>{recipe.name}</h1>
      <h2>Description</h2>
      <p className={cssClasses.Description}>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul className={cssClasses.Ingredients}>
        {recipe.ingredients.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
      {recipe.musical_genre && (
        <>
          <h2>Music</h2>
          <p className={cssClasses.MusicalGenre}>{recipe.musical_genre}</p>
        </>
      )}
    </div>
  );
}