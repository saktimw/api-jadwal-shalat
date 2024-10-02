// parsing object ke body untuk Content-Type: application/x-www-form-urlencoded 
export function ObjToEncodedBody(obj: TObject) {
   if (typeof obj !== "object") return "";
   
   return new URLSearchParams(
      Object.entries(obj)
   );
}