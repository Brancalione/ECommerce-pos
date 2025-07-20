import { useEffect, useState } from "react";
import { Produto } from "../inteface/produtos";
import { Cartao_produtos } from "./cartao_produtos";
// importar constante com JSON

export const ListarCartoes: React.FC = () => {
    const [todosProdutos , setTodosProdutos] = useState<Produto[]>([]); 
    const [produtosExibidos, setProdutosExibidos] = useState<Produto[]>([]);
    const [idFiltro, setIdFiltro] = useState<number>();

    const lerProdutosJson =  () => {
      fetch('/data.json')
        .then((res) => res.json())
        .then((data: Produto[]) => {
          setTodosProdutos(data);
          setProdutosExibidos(data); 
      });
    };// remover para outro elemento

    useEffect(() => {
      lerProdutosJson();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIdFiltro(event.target.valueAsNumber); 
    };

    const filtrar_por_id = (event: React.FormEvent) => {
      event.preventDefault(); 
      if (idFiltro) {
        const produtosFiltrados = todosProdutos.filter((produto) => produto.id === idFiltro);
        setProdutosExibidos(produtosFiltrados);
      } else {
        setProdutosExibidos(todosProdutos);
      }
    }
    
    return (
      <>
        <form onSubmit={filtrar_por_id}>
          <input 
            type="number"
            placeholder="Código"
            value={idFiltro}
            onChange={handleChange} />
          <button type='submit' className='filtrar'>Filtrar</button>
        </form>
        
        {produtosExibidos.map((produto: Produto) => (
          <Cartao_produtos produto={produto}
          />      
        ))}
        
      </>  
    )
}