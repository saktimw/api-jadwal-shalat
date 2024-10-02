import Elysia, { Context, NotFoundError, t } from "elysia";
import { getJadwalShalat } from "../services/bimasislam";
import { error_parse } from "../helpers/error-parse";

const app = new Elysia({ prefix: "/jadwal" })
// ambil list jadwal per bulan 
.get("/", async ({ query, store }: Context & { store: InitState }) => {         
      try {
         const jadwal = await getJadwalShalat({
            prov: query.province,
            reg: query.regency,
            month: Number(query.month),
            year: Number(query.year),
            cookie: store.phpsession,
         })
         
         if (typeof jadwal.data === "object") {
            for (const j in jadwal.data) {
               delete jadwal.data[j].tanggal
            }

            return {
               status: "OK",
               province: {
                  id: query?.province,
                  name: jadwal.prov
               },
               regency: {
                  id: query?.regency,
                  name: jadwal.kabko
               },
               jadwal: jadwal.data
            }
         }

      } catch (err: any) {
          
         const { status } = error_parse(err.message);
			return {
				status: status
			}
      }
   }, {
      // cek query params jika kosong
      beforeHandle({ query }) {
         if (Object.keys(query).length === 0) {
            throw new NotFoundError()
         }
      },
   })

   export default app;
