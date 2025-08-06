import type { Recipe, Result } from "$/types.ts";

const API_BASE_URL = "http://0.0.0.0:8000/api/v1";

const API_WORKER = new Worker(
  new URL("../workers/api.worker.ts", import.meta.url),
  { type: "module" }
);

async function fetchJson<T>(
  url: string,
  requestInit: RequestInit | null,
  defaultValue: T
): Promise<T> {
  try {
    const response = await fetch(API_BASE_URL + url, requestInit ?? undefined);
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.log({ "apiError": { url, error } });
    return defaultValue;
  }
}

export function getCocktailRecipe(prompt: string) {
  return fetchJson<Result<Recipe, string[]>>(
    "/cocktails/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    },
    [null, ["Error getting recipe."]]
  );
}

export function onCocktailRecipeReceived(
  listener: (result: Result<Recipe, string[]>) => unknown
): void {
  API_WORKER.onmessage = (e) => listener(e.data);
}

export function requestCocktailRecipe(prompt: string): void {
  API_WORKER.postMessage(prompt);
}
