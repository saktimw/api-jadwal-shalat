interface Option {
   label: string;
   value: any;
} 

type TObject = Record<string, any>

interface InitState {
   phpsession: string,
}

// bimasislam
interface RegencyParams {
   provid: string;
} 

interface JadwalShalatParams {
   prov: string;
   reg: string;
   year: number;
   month: number
}