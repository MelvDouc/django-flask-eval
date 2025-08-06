import { Router, Route } from "client-side-router";
import HomePage from "$/pages/HomePage.js";

export default function App() {
  return (
    <>
      <main>
        <Router>
          <Route path="/" component={HomePage} />
        </Router>
      </main>
    </>
  );
}