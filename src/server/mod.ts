import { ServerContext } from "./context.ts";
import { listenAndServe } from "./deps.ts";
import { PageModule, RendererModule } from "./types.ts";
export type { Handler, HandlerContext, Handlers } from "./types.ts";
export { RenderContext } from "./render.tsx";
export type { RenderFn } from "./render.tsx";

export interface Routes {
  pages: Record<string, PageModule | RendererModule>;
  baseUrl: string;
}

export { ServerContext };

export async function start(routes: Routes) {
  const start = performance.now();
  const ctx = await ServerContext.fromRoutes(routes);
  console.debug(`ServerContext created in ${performance.now() - start}ms`);
  console.log("Server listening on http://localhost:8000");
  await listenAndServe(":8000", ctx.handler());
}
