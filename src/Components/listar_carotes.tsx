import { useState } from "react";
import { Produto } from "../inteface/produtos";
import { Cartao_produtos } from "./cartao_produtos";
import '../ComponentsCss/input_filtrar.css';
import { Link, useRouteLoaderData } from "react-router-dom";
import { useProdutos } from "../data/produtos_context";

export const ListarCartoes: React.FC = () => {
    // const dadosLoader = useRouteLoaderData("id") as Produto[];
    const { produtos } = useProdutos();

    const [todosProdutos ] = useState<Produto[]>(produtos); 
    const [produtosExibidos, setProdutosExibidos] = useState<Produto[]>(produtos);
    const [idFiltro, setIdFiltro] = useState<number>();

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
        <div className="botoes_topo">
          <form className="input_filtrar" onSubmit={filtrar_por_id}>
            <input id="input_filtrar"
              type="number"
              placeholder="Código"
              value={idFiltro}
              onChange={handleChange} />
            <button type='submit' className='filtrar'>Filtrar</button>
          </form>
          <Link to="/listar/novo">
            <button  className="botao_cadastrar">Novo Produto</button>
          </Link>
        </div>
        {produtosExibidos.map((produto: Produto) => (
          <Cartao_produtos produto={produto}
          />      
        ))}
      </>  
    )
}