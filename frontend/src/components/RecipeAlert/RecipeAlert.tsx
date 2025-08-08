import type { Recipe } from "$/types.ts";
import { onRecipeReceived } from "$/utils/api.ts";
import { Link } from "$/utils/Router.tsx";
import routes from "$/utils/routes.ts";
import { obs } from "reactfree-jsx";
import cssClasses from "./RecipeAlert.module.scss";

export default function RecipeAlert() {
  const resultObs = obs<RequestResult>({ status: "none" });

  const $init = (element: HTMLDialogElement): void => {
    resultObs.subscribe((value) => {
      if (value.status === "none") {
        element.close();
        return;
      }

      element.showModal();
    });

    onRecipeReceived((result) => {
      if (!result.success) {
        resultObs.value = { status: "failure", error: result.error };
        return;
      }

      resultObs.value = { status: "success", recipe: result.data };
    });
  };

  return (
    <dialog className={cssClasses.RecipeAlert} $init={$init}>
      <div className={cssClasses.Content}>
        {resultObs.map((result) => (
          <RecipeAlertChildren result={result} />
        ))}
      </div>
      <button
        data-status={resultObs.map(({ status }) => status)}
        on:click={() => resultObs.value = { status: "none" }}
      >OK</button>
    </dialog>
  );
}

function RecipeAlertChildren({ result }: {
  result: RequestResult;
}) {
  switch (result.status) {
    case "success":
      return (
        <p>Your recipe is ready <Link href={routes.RecipePage(result.recipe.id)} state={result.recipe}>here</Link>!</p>
      );
    case "failure":
      return (
        <p>{result.error}</p>
      );
    case "none":
      return null;
  }
}

type SuccessRequestResult = {
  status: "success";
  recipe: Recipe;
};

type FailureRequestResult = {
  status: "failure";
  error: string;
};

type NoneRequestResult = {
  status: "none";
};

type RequestResult =
  | SuccessRequestResult
  | FailureRequestResult
  | NoneRequestResult;