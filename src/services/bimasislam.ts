import { ObjToEncodedBody } from "../utils/functions";

// fungsi get list kabupaten
export async function getRegency(params: RegencyParams & { cookie: string }) {
   if (!params.cookie) throw new Error("401")
   
   const regency = await fetch(`${import.meta.env.URL_KEMENAG}/ajax/getKabkoshalat`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Cookie': params.cookie
      },
      body: ObjToEncodedBody({
         x: params.provid
      })
   });
   
   if (!regency) throw new Error("400");
   const result = await regency.text();
   
   if (result.match(/"Illegal Key"/)) throw new Error("401");
   // ambil value dari response & ubah menjadi object
   const toList: Option[] | [] = [...result.matchAll(/<option value="([^"]+)">([^<]+)<\/option>/g)].map(item => ({
      value: item[1],
      label: item[2],
      }));

   return toList;
}

// fungsi get list jadwal shalat bulan X dan tahun X
export async function getJadwalShalat(params: Partial<JadwalShalatParams> & { cookie: string }) {
   if (!params.cookie) throw new Error("401")
      
      const jadwal = await fetch(`${import.meta.env.URL_KEMENAG}/ajax/getShalatbln`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Cookie': params.cookie
      },
      body: ObjToEncodedBody({
         x: params.prov,
         y: params.reg,
         bln: params.month,
         thn: params.year
      })
   });

   if (!jadwal) throw new Error("400");
   return await jadwal.json()
}