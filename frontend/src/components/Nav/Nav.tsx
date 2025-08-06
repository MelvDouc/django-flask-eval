import { Link } from "$/utils/Router.tsx";
import routes from "$/utils/routes.ts";

import cssClasses from "./Nav.module.scss";

export default function Nav() {
  return (
    <div className={cssClasses.Nav}>
      <ul>
        <li><Link href={routes.Home}>Home</Link></li>
        <li><Link href={routes.RequestCocktail}>Request cocktail</Link></li>
      </ul>
    </div>
  );
}