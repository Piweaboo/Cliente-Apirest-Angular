import { Region } from "./region.interface";

export interface Cliente{
  id:number;
  nombre:string;
  apellido:string;
  email:string;
  telefono:number;
  createAt:string|null;
  imagen:string;
  region:Region;
}
