import { useEffect, useState } from "react";
import { Produto } from "../inteface/produtos";
import { Cartao_produtos } from "./cartao_produtos";
import { ReactFormState } from "react-dom/client";


export const ListarCartoes = () => {
    const [todosProdutos , setTodosProdutos] = useState<Produto[]>([]); 
    const [produtosExibidos, setProdutosExibidos] = useState<Produto[]>([]);
    const [idFiltro, setIdFiltro] = useState<string>();

    const lerProdutosJson =  () => {
      fetch('/data.json')
        .then((res) => res.json())
        .then((data: Produto[]) => {
          setTodosProdutos(data);
          setProdutosExibidos(data); 
      });
    };

    useEffect(() => {
      lerProdutosJson();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIdFiltro(event.target.value); 
    };

    const filtrar_por_id = (event: React.FormEvent) => {
      event.preventDefault(); 
      if (idFiltro) {
        const produtosFiltrados = todosProdutos.filter((produto) => Number(produto.id) === Number(idFiltro));
        setProdutosExibidos(produtosFiltrados);
      } else {
        setProdutosExibidos(todosProdutos);
      }
    }
    
    return (
      <>
        <form onSubmit={filtrar_por_id}>
          <input 
            type="text"
            placeholder="Código"
            value={idFiltro}
            onChange={handleChange} />
          <button type='submit' className='filtrar'>Filtrar</button>
        </form>
        
        {produtosExibidos.map((produto: Produto) => (
          <Cartao_produtos 
            id = { produto.id}
            name = {produto.name}
            description = {produto.description}
            price = { produto.price}
            category = { produto.category }
            pictureUrl = {produto.pictureUrl }
          />      
        ))}
        
      </>  
    )
}