export default function RequestCocktailForm() {
  return (
    <form method="POST">
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