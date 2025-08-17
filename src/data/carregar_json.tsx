import { Produto } from '../inteface/produtos';
import axios from "axios";

export async function carregarJson() {
  console.log("1")

  const response = await axios.get<Produto[]>("http://localhost:3001/api/product");
  console.log("ase")
  return response.data as Produto[];;
}