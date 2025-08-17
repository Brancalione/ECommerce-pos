export interface Produto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
  }
export interface ProdutosContextType {
  produtos: Produto[];
  adicionarProduto: (produto: Produto) => void;
}
export interface ProdutoSemID {
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}