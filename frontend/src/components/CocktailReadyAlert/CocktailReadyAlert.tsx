import type { Recipe } from "$/types.ts";
import { onCocktailRecipeReceived } from "$/utils/api.ts";
import { obs } from "reactfree-jsx";

import cssClasses from "./CocktailReadyAlert.module.scss";

export default function CocktailReadyAlert() {
  const resultObs = obs<RequestResult>({ status: "none" });

  const $init = (element: HTMLDialogElement): void => {
    resultObs.subscribe((value) => {
      if (value.status === "none") {
        element.close();
        return;
      }

      element.showModal();
    });

    onCocktailRecipeReceived(([recipe, errors]) => {
      if (errors) {
        resultObs.value = { status: "failure", errors };
        return;
      }

      resultObs.value = { status: "success", recipe };
    });
  };

  return (
    <dialog className={cssClasses.CocktailReadyAlert} $init={$init}>
      <div className={cssClasses.Content}>
        {resultObs.map((result) => (
          <CocktailReadyAlertChildren result={result} />
        ))}
      </div>
      <button
        data-status={resultObs.map(({ status }) => status)}
        on:click={() => resultObs.value = { status: "none" }}
      >OK</button>
    </dialog>
  );
}

function CocktailReadyAlertChildren({ result }: {
  result: RequestResult;
}) {
  switch (result.status) {
    case "success":
      return (<p>Your recipe is ready!</p>);
    case "failure":
      return (
        <ul>
          {result.errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
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
  errors: string[];
};

type NoneRequestResult = {
  status: "none";
};

type RequestResult =
  | SuccessRequestResult
  | FailureRequestResult
  | NoneRequestResult;