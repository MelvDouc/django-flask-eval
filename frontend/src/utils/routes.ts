const routes = {
  Home: "/",
  RecipesPage: "/recipes",
  RecipePage: (id: string | number) => `/recipes/@/${id}`,
  RecipeRequest: "/recipes/request"
} as const;

export default routes;