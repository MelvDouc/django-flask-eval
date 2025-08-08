import { requestRecipe } from "$/utils/api.ts";
import cssClasses from "./RequestRecipeForm.module.scss";

export default function RequestRecipeForm() {
  return (
    <form method="POST" on:submit={handleSubmit} className={cssClasses.RequestRecipeForm}>
      <section className={cssClasses.Row}>
        <article className={cssClasses.Col}>
          <label htmlFor="prompt">Your prompt</label>
          <textarea
            name="prompt"
            id="prompt"
            rows={10}
          ></textarea>
        </article>
      </section>
      <section className={cssClasses.Row}>
        <article className={cssClasses.Col}>
          <button type="submit">Go</button>
        </article>
      </section>
    </form>
  );
}

function PostRequestMessage() {
  return (
    <>
      <p>Your request has been received. You'll be notified when the recipe is ready -- this shouldn't take more than 5 minutes.</p>
      <p>Stay tuned!</p>
    </>
  );
}

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const prompt = formData.get("prompt") as string;
  requestRecipe(prompt);
  form.replaceWith(<PostRequestMessage />);
}