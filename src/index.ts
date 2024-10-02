import { Elysia, error } from 'elysia'
import { states } from './config/state';
import { loadAllRoutes } from './config/route';
import { middleware } from './middleware';
import { error_parse } from './helpers/error-parse';

export const ROOT_DIR: string = import.meta.dir;

new Elysia()
.state({ ...states })
.onBeforeHandle(({ store }) => middleware(store))
	.use(loadAllRoutes)
		.onError(({ code }) => {
			if (code === "NOT_FOUND") {
				const { status } = error_parse("P404")
				return {
					status: status
				}
			}
		})
		.get('/', async () => 'Connected !')
.listen(import.meta.env.APP_PORT ?? 3000)

console.log(`Connected !\nLink: http://localhost:${import.meta.env.APP_PORT}
`);