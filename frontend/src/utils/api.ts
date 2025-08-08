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

export function getRecipes(start: number, end: number) {
  return fetchJson<Recipe[], string>(
    `/recipes/?start=${start}&end=${end}`,
    null,
    { success: false, error: "Errors getting recipes." }
  );
}

export function getSavedRecipe(id: number) {
  return fetchJson<Recipe, string>(
    "/recipes/" + id,
    null,
    { success: false, error: `Could not get recipe with id "${id}".` }
  );
}

export function getNewRecipe(prompt: string) {
  return fetchJson<Recipe, string>(
    "/recipes/",
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

export function onRecipeReceived(listener: (result: Result<Recipe, string>) => unknown): void {
  API_WORKER.onmessage = (e) => listener(e.data);
}

export function requestRecipe(prompt: string): void {
  API_WORKER.postMessage(prompt);
}
