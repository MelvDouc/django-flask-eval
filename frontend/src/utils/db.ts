import type { Recipe } from "$/types.ts";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("cocktail_recipes") as Dexie & {
  recipes: EntityTable<Recipe, "id">;
};

db.version(1).stores({
  recipes: "id,name,description,ingredients,musical_genre"
});

export function getRecipeById(id: number) {
  return db.recipes.get(id);
}

export function addRecipe(recipe: Recipe) {
  return db.recipes.add(recipe);
}