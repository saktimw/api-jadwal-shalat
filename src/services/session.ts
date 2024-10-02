export async function getPHPSession() {
   let phpsess = "";
   try {
      const head = await fetch(`${import.meta.env.URL_KEMENAG}/jadwalshalat`, {
         method: "HEAD"
      })
      if (head.status === 200) 
         phpsess = head.headers.getSetCookie()[0].split(";")[0].trim();
      
   } catch (error) {
      if (error) return phpsess;
   }

   return phpsess;
}