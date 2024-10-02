export function error_parse(err_code: string | number) {
   let code: number | number = 400;
   let status: string = ""
   
   switch (err_code) {
      case "401":
         code = 401
         status = "No Session";
         break;
      case "404":
         code = 404
         status = "Not Found";
         break;
      case "P404":
         code = 404
         status = "Page Not Found";
         break;
      case "500":
         code = 500
         status = "Internal Server Error";
         break;
      default:
         code = code;
         status = "Bridging Error"
   }

   return { code, status }
}