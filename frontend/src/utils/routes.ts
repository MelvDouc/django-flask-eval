const routes = {
  Home: "/",
  CocktailList: "/cocktails",
  CocktailPage: (id: string | number) => `/cocktails/@/${id}`,
  RequestCocktail: "/cocktails/request"
} as const;

export default routes;