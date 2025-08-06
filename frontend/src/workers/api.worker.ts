import { getCocktailRecipe } from "$/utils/api.ts";

self.onmessage = async (e) => {
  const prompt = (e as MessageEvent<string>).data;
  const result = await getCocktailRecipe(prompt);
  self.postMessage(result);
};