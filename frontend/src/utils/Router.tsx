import type { ComponentChild } from "reactfree-jsx";

type Appendable = string | Node;
type HandlerReturnValue = Appendable | Promise<Appendable>;
type ParamRecord = Record<string, string>;
type Handler = (params?: ParamRecord) => HandlerReturnValue;
type ReadyHandler = () => HandlerReturnValue;

type InferParams<T extends string> =
  T extends `${infer A}/${infer B}` ? InferParams<A> & InferParams<B>
  : T extends `/${infer A}` ? InferParams<A>
  : T extends `:${infer A}` ? { [K in A]: string }
  : {};

const ANCHOR_CLICK_EVENT_NAME = "@anchor-click";

class RouteObject {
  public readonly pathRegex: RegExp;
  public readonly handler: Handler;

  public constructor(pathRegex: RegExp, handler: Handler) {
    this.pathRegex = pathRegex;
    this.handler = handler;
  }
}

class RouterOutlet extends HTMLElement {
  public static readonly routeQueue: RouteObject[] = [];

  private readonly stack: RouteObject[];
  private readonly handlerCache: Record<string, ReadyHandler | null> = {};

  private currentPath: string | null = null;

  public constructor() {
    super();
    this.stack = [...RouterOutlet.routeQueue];
    RouterOutlet.routeQueue.length = 0;
  }

  async connectedCallback() {
    window.addEventListener("popstate", async () => {
      if (this.isNewPath(location.pathname))
        await this.updateUI(location.pathname);
    });

    window.addEventListener(ANCHOR_CLICK_EVENT_NAME, async (e) => {
      const { url, state } = (e as CustomEvent<{ url: URL; state: unknown; }>).detail;

      if (!this.isNewPath(url.pathname))
        return;

      history.pushState(state, "", url);
      await this.updateUI(url.pathname);
    });

    await this.updateUI(location.pathname);
  }

  private findHandler(path: string): ReadyHandler | null {
    if (path in this.handlerCache)
      return this.handlerCache[path];

    for (const { pathRegex, handler } of this.stack) {
      const matchArray = path.match(pathRegex);

      if (!matchArray)
        continue;

      const params = matchArray.groups;
      return this.handlerCache[path] = () => handler(params);
    }

    return this.handlerCache[path] = null;
  }

  private async updateUI(path: string): Promise<void> {
    const handler = this.findHandler(path);

    if (!handler)
      throw new Error(`Route not found: ${path}`);

    this.replaceChildren(await handler());
  }

  private isNewPath(path: string): boolean {
    if (path === this.currentPath)
      return false;

    this.currentPath = path;
    return true;
  }
}

customElements.define("router-outlet", RouterOutlet);

export function Route<T extends string>({ path, handler }: {
  path: T;
  handler: (params: InferParams<T>) => HandlerReturnValue;
}): null {
  const pathRegexSource = path.replace(/:(\w+)/g, (_, p) => `(?<${p}>\\w+)`);
  const pathRegex = RegExp(`^${pathRegexSource}$`);
  const route = new RouteObject(pathRegex, handler as Handler);
  RouterOutlet.routeQueue.push(route);
  return null;
}

export function Router(_props: {
  children: unknown;
}) {
  return new RouterOutlet();
}

export function Link({ href, state, children }: {
  href: string;
  state?: unknown;
  children: ComponentChild;
}) {
  const url = new URL(href, location.origin);
  const customEvent = new CustomEvent(ANCHOR_CLICK_EVENT_NAME, {
    detail: { url, state }
  });

  const handleClick = (e: Event) => {
    e.preventDefault();
    window.dispatchEvent(customEvent);
  };

  return (
    <a href={url.pathname} on:click={handleClick}>{children}</a>
  );
}