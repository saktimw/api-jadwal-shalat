import { getRegency } from "./services/bimasislam";
import { getPHPSession } from "./services/session";

export async function middleware(store: InitState) {
   // jika session belum ada, ambil session dari cookie kemenag
   if (store.phpsession === "") {
      const sess = await getPHPSession();
      store.phpsession = sess
      // jika sudah ada, cek kembali sesi jika expired ambil kembali
   } else {
      
      try {
         await getRegency({
            provid: "6f3ef77ac0e3619e98159e9b6febf557",
            cookie: store.phpsession
         });
         
         store.phpsession = store.phpsession;
         
      } catch (err: any) {
         const sess = await getPHPSession();
         if (err.message === "401") {
            store.phpsession = sess;
         }
      }
   }
}