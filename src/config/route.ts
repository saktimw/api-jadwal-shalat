import Elysia from "elysia";
import { readdir } from "node:fs/promises";
import { ROOT_DIR } from "..";

// load semua files dalam folder routes & register menjadi routes
export async function loadAllRoutes(app: Elysia) {
   const routes: string[] = await readdir(`${ROOT_DIR}/routes`);
   routes.forEach((file: string) => app.use(import(`${ROOT_DIR}/routes/${file}`)) )
   
   return app;
}