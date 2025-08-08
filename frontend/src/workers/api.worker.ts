import { getNewRecipe } from "$/utils/api.ts";

self.onmessage = async (e) => {
  const prompt = (e as MessageEvent<string>).data;
  const result = await getNewRecipe(prompt);
  self.postMessage(result);
};