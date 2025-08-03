import { Produto } from '../inteface/produtos';
import data from './data.json'

export function carregarJson(){
  return data as Produto[];
}