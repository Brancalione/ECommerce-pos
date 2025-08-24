
import { Produto } from '../inteface/produtos';
import axios from "axios";
import { redirect } from "react-router-dom";

export async function carregarJson(): Promise<Produto[]> {
  try {
    const response = await axios.get<Produto[]>("http://localhost:3001/api/product");
    if (!response.data || response.data.length === 0) {
      alert("Não existem produtos cadastrados.");
    }
    return response.data
  } catch (error) {
    alert("Erro ao carregar os produtos:"+ error);
    throw error;
  }
}
