import { Elysia, Context } from "elysia";
import { ProvincesList } from "../shared/data/provinces";
import { getRegency } from "../services/bimasislam";
import { error_parse } from "../helpers/error-parse";

const app = new Elysia({ prefix: "/regional" })
	// ambil list provinsi
   .get("/province", ({ query }) => {
		if (!query.search) return {
			status: "OK",
			data: ProvincesList
		}
		
		const filtered = ProvincesList.filter(
			({ label }) => label.toLowerCase().search(query.search as string) !== -1
		);
		
		return {
			status: "OK",
			data: filtered
		};
	})
	// ambil list kabupaten
	.get("/regency/:prov", async ({ params: { prov }, store }: Context & { store: InitState }) => {
		try {
			const reg = await getRegency({
				cookie: store.phpsession,
				provid: prov
			});
	
			if (reg.length === 0) {
				const { status } = error_parse("404")
				return {
					status: status
				}
				
			} else {
				return {
					status: "OK",
					data: reg
				}
			}

			
		} catch (err: any) {

			const { status } = error_parse(err.message);
			return {
				status: status
			}
		}
	}, {
      beforeHandle({ params: { prov }, error }) {
         if (!prov) {
				const { status } = error_parse("P404");
				return {
					status: status
				}
         }
      },
   })

export default app;
