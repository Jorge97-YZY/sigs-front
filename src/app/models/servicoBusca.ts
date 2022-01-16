import { Cliente } from "./cliente";

export interface ServicoBusca {
  descricao: string,
  valor: number,
  data:string,
  cliente: Cliente
}
