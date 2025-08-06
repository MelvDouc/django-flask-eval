import { requestCocktailRecipe } from "$/utils/api.ts";

export default function RequestCocktailForm() {
  return (
    <form method="POST" on:submit={handleSubmit}>
      <section className="row">
        <article className="col">
          <label htmlFor="prompt" className="form-label">Your prompt</label>
          <textarea
            className="form-control"
            name="prompt"
            id="prompt"
            rows={10}
            cols={20}
          ></textarea>
        </article>
      </section>
      <section className="row">
        <article className="col">
          <button type="submit" className="btn btn-success">Go</button>
        </article>
      </section>
    </form>
  );
}

function PostRequestMessage() {
  return (
    <p>Your request has been received. You'll be notified when the recipe is ready. Stay tuned!</p>
  );
}

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const prompt = formData.get("prompt") as string;
  requestCocktailRecipe(prompt);
  form.replaceWith(<PostRequestMessage />);
}