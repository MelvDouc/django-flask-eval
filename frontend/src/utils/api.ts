import type { AsyncResult, Recipe, Result } from "$/types.ts";

const API_BASE_URL = "http://0.0.0.0:8000/api/v1";

const API_WORKER = new Worker(
  new URL("../workers/api.worker.ts", import.meta.url),
  { type: "module" }
);

async function fetchJson<T, E>(
  url: string,
  requestInit: RequestInit | null,
  defaultValue: Result<T, E>
): AsyncResult<T, E> {
  try {
    const response = await fetch(API_BASE_URL + url, requestInit ?? undefined);
    const result = await response.json();
    return result as Result<T, E>;
  } catch (error) {
    console.log({ "apiError": { url, error } });
    return defaultValue;
  }
}

export function getCocktailRecipes(start: number, end: number) {
  return fetchJson<Recipe[], string>(
    `/cocktails/?start=${start}&end=${end}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    },
    { success: false, error: "Errors getting recipes." }
  );
}

export function getCocktailRecipe(prompt: string) {
  return fetchJson<Recipe, string>(
    "/cocktails/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    },
    { success: false, error: "Error getting recipe." }
  );
}

export function onCocktailRecipeReceived(
  listener: (result: Result<Recipe, string>) => unknown
): void {
  API_WORKER.onmessage = (e) => listener(e.data);
}

export function requestCocktailRecipe(prompt: string): void {
  API_WORKER.postMessage(prompt);
}
